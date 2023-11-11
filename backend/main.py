from fastapi import FastAPI
from github import Github
from Models.IssueModel import IssueModel
from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.output_parsers import PydanticOutputParser
from dotenv import load_dotenv
from autogen import UserProxyAgent, AssistantAgent,GroupChat, GroupChatManager, config_list_from_json
from Models.Tasks import Tasks

import uvicorn
import os

load_dotenv()

# Create the app object
app = FastAPI()

config_list = config_list_from_json(env_or_file="OAI_CONFIG_LIST")

llm_config = {
    "functions": [
        {
            "name": "create_branch",
            "description": "Creates the branch to the repo.",
            "parameters": {
                "type": "object",
                "properties": {
                    "branch_name": {
                        "type": "string",
                        "description": "Name of the branch to be created.",
                    },
                    "repo_name": {
                        "type": "string",
                        "description": "Name of the repo to create the branch in.",
                    },
                },
                "required": ["branch_name", "repo_name"],
            }
        },
    ],
    "request_timeout": 300,
    "seed": 42,
    "config_list" : config_list,
    "temperature" : 0,
}

def create_branch_function(branch_name, repo_name):
    user = g.get_user(username)
    repo = user.get_repo(repo_name)
    os.system(f"git clone {repo.html_url} && cd {repo_name} && git checkout -b {branch_name} && git push --set-upstream origin {branch_name}")
    return "Branch created!"


username = "FranciscoGaspar"
url = f"https://api.github.com/users/{username}"

g = Github(login_or_token=os.getenv('GITHUB_TOKEN'))

# Create endpoint to get issues from github
# The endpoint must receive the repo where the issues are
@app.get("/repo/{repo_name}/issues")
async def get_issues(repo_name: str):
    user = g.get_user(username)
    repo = user.get_repo(repo_name)
    issues =  repo.get_issues(state="open", labels=["issue"])

    issues_list = []
    for issue in issues:
        issues_list.append(IssueModel(id=issue.number, title=issue.title, body=issue.body))
    return {"issues": issues_list}

# Create endpoint that receives an issue id, 
# extracts the body and send it to the model to split into subtasks
@app.post("/repo/{repo_name}/{issue_id}")
async def get_issue(repo_name:str, issue_id: int):
    user = g.get_user(username)
    repo = user.get_repo(repo_name)
    main_issue = repo.get_issue(number=issue_id)
    
    if any(label.name == "sub-tasks-created" for label in main_issue.labels):
        return {"error": "This issue already has sub-tasks created!"}

    chat = ChatOpenAI(temperature=0, openai_api_key=os.getenv('OPENAI_KEY'))
    system_message_prompt = SystemMessagePromptTemplate.from_template("You are a helpful, professional and concise AI that provides good tasks to complete the user story and acceptance criteria that you received.")

    promptTemplate = """
        Given the following user story and acceptance criteria create tasks in order to complete them.
        All tasks must be attributed to frontend or backend.
        A task should have a full description with everything needed for the engineer to complete the task including fields name that need creation or validation.
        Not all tasks need to be attributed to frontend and backend.
        Make the minimal tasks to complete the user story.

        user_story: {user_story}

        {format_instructions}
        """
    parser = PydanticOutputParser(pydantic_object=Tasks)

    human_message_prompt = HumanMessagePromptTemplate.from_template(promptTemplate)

    chat_prompt = ChatPromptTemplate(messages=[system_message_prompt, human_message_prompt], partial_variables={"format_instructions": parser.get_format_instructions()})

    chat_messages = chat_prompt.format_prompt(user_story=main_issue.body).to_messages()

    result = chat(chat_messages)

    parse_result = parser.parse(result.content)

    created_issue_list = []
    for task in parse_result.tasks:
        created_issue = repo.create_issue(title=f"[{issue_id}]({task.assigned_to}) {task.title}", body=task.description, labels=["sub-task", "todo"])
        created_issue_list.append(IssueModel(id=created_issue.number, title=created_issue.title, body=created_issue.body))
    
    main_issue.add_to_labels("sub-tasks-created")
    
    return created_issue_list

@app.post("/repo/{repo_name}/{issue_id}/create-boilerplate")
async def get_issue(repo_name:str, issue_id: int):
    user = g.get_user(username)
    repo = user.get_repo(repo_name)
    main_issue = repo.get_issue(number=issue_id)

    user_proxy = UserProxyAgent(
        name="Admin",
        system_message=f"A Human Admin. Interact with the git manager to create the branch by providing the branch name and sending the repo name as {repo_name}. Make sure the branch name is created based on the task title. For example, if the task title is 'Create a new page', the branch name should be 'create-a-new-page'. Reply TERMINATE if the task has been solved at full satisfaction.",
        human_input_mode="NEVER",
        is_termination_msg=lambda x: x.get("content", "") and x.get("content", "").rstrip().endswith("TERMINATE"),
        code_execution_config={"work_dir": "repo"},
        llm_config=llm_config,
        max_consecutive_auto_reply=10
    )

    git_manager = AssistantAgent(
        name="Git_Manager",
        system_message=f"For git management, only use functions you are provided with. You know the repo name is {repo_name}Reply TERMINATE if the task has been solved at full satisfaction.",
        code_execution_config=False,
        llm_config=llm_config
    )

    user_proxy.register_function(
        function_map={
            "create_branch": create_branch_function,
        }
    )

    user_proxy.initiate_chat(git_manager, message=f"Based on the task title work with git manager to create the branch. The provided task title is {main_issue.title}.")



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

