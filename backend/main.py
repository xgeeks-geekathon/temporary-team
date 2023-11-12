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
from memgpt.autogen.memgpt_agent import create_autogen_memgpt_agent

import uvicorn
import os

load_dotenv()

# Create the app object
app = FastAPI()

### LLM Config ###
config_list = config_list_from_json(env_or_file="OAI_CONFIG_LIST")

llm_config = {
    "functions": [
        {
            "name": "save",
            "description": "Save the code to disk.",
            "parameters": {
                "type": "object",
                "properties": {
                    "content": {
                        "type": "string",
                        "description": "Content to be saved in the file",
                    },
                    "pathToFile": {
                        "type": "string",
                        "description": "Name of the file",
                    }

                },
                "required": ["content", "pathToFile"],
            }
        },
    ],
    "request_timeout": 300,
    "seed": 42,
    "config_list" : config_list,
    "temperature" : 0,
}

### Git Management ###

username = "FranciscoGaspar"
url = f"https://api.github.com/users/{username}"

g = Github(login_or_token=os.getenv('GITHUB_TOKEN'))

def create_branch(repo_name, branch_name):
    """
    Create a new branch in a GitHub repository.

    Args:
        repo_name (str): The name of the GitHub repository.
        branch_name (str): The name of the new branch to be created.

    Returns:
        None

    Example Usage:
        create_branch("my-repo", "feature/new-feature")

    This code will create a new branch named "feature/new-feature" in the "my-repo" repository.
    """
    user = g.get_user(username)
    repo = user.get_repo(repo_name)
    if(os.path.exists(repo_name)):
        os.system(f"rm -rf {repo_name}")
    os.system(f"git clone {repo.html_url} && cd {repo_name} && git checkout -b {branch_name} && git push --set-upstream origin {branch_name}")

def commit_changes(repo_name, branch_name, commit_message):
    """
    Commit and push changes to a Git repository.

    Args:
        repo_name (str): The name of the Git repository.
        branch_name (str): The name of the branch to commit the changes to.
        commit_message (str): The commit message to describe the changes.

    Returns:
        None: The function does not return any value.
    """
    os.system(f"cd {repo_name} && git add . && git commit -m '{commit_message}' && git push origin {branch_name}")

def move_to_commit_hash(hash, repo):
    """
    Clones a Git repository and checks out a specific commit hash.

    Args:
        hash (str): The commit hash to check out.
        repo (object): The Git repository object.

    Returns:
        None

    Raises:
        None
    """
    if(os.path.exists(repo.name)):
        os.system(f"rm -rf {repo.name}")
    os.system(f"git clone {repo.html_url} && cd {repo.name} && git checkout {hash}")

def create_branch_AI(issue, repo_name):
    """
    Generates a branch name for a GitHub repository based on the title of a task.
    Uses an AI chat model to provide a branch name suggestion.
    Creates a new branch in the repository with the generated branch name.

    Args:
        issue (Issue): The Github Issue.
        repo_name (str): The name of the GitHub repository.

    Returns:
        str: The generated branch name.
    """
    chat = ChatOpenAI(temperature=0, openai_api_key=os.getenv('OPENAI_KEY'))
    system_message_prompt = SystemMessagePromptTemplate.from_template("You are a helpful, professional and concise AI that provides good branch names based on a title of a task.")

    prompt_template = """
        Given the following task name create a branch name.
        The branch name should be based of the title of the task.
        If the task is a feature the branch name should be feature/{task_name}.
        If the task is a bug the branch name should be bug/{task_name}.

        If for example the title of the task is "US-1: Create login page" the branch name should be feature/us-1-create-login-page.

        Task Name: {task_name}

        The response should be only the branch name.

        """

    human_message_prompt = HumanMessagePromptTemplate.from_template(prompt_template)

    chat_prompt = ChatPromptTemplate(messages=[system_message_prompt, human_message_prompt])

    chat_messages = chat_prompt.format_prompt(task_name=issue.title).to_messages()

    result = chat(chat_messages)

    create_branch(repo_name=repo_name, branch_name=result.content)

    return result.content

### File Management ###
def save(content, pathToFile):
    """
    Save the content to a file specified by the pathToFile parameter.

    Args:
        content (str): The content to be saved in the file.
        pathToFile (str): The path and name of the file to save the content to.

    Returns:
        None

    Example:
        save("Hello, World!", "output.txt")
    """
    path = os.path.join("geekathon", pathToFile)
    with open(path, "w+") as f:
        f.write(content)

def get_content(pathToFile):
    """
    Reads the content of a file specified by the `pathToFile` parameter and returns it as a string.

    Args:
        pathToFile (str): The path to the file from which the content needs to be read.

    Returns:
        str: The content of the file specified by the `pathToFile` parameter.
    """
    dir_path = os.path.dirname(pathToFile)
    if(dir_path == ""):
        return ""
    with open(pathToFile, "r") as f:
        return f.read()

@app.get("/repo/{repo_name}/issues")
async def get_issues(repo_name: str):
    try:
        user = g.get_user(username)
        repo = user.get_repo(repo_name)
        issues =  repo.get_issues(state="open", labels=["issue"])

        issues_list = []
        for issue in issues:
            issues_list.append(IssueModel(id=issue.number, title=issue.title, body=issue.body))

        return {"issues": issues_list}
    except:
        return {"error": "An error occurred!"}

@app.post("/repo/{repo_name}/issues/{issue_id}")
async def get_issue(repo_name:str, issue_id: int):
    try:
        user = g.get_user(username)
        repo = user.get_repo(repo_name)
        main_issue = repo.get_issue(number=issue_id)
        
        if any(label.name == "sub-tasks-created" for label in main_issue.labels):
            return {"error": "This issue already has sub-tasks created!"}

        chat = ChatOpenAI(temperature=0, openai_api_key=os.getenv('OPENAI_KEY'))
        system_message_prompt = SystemMessagePromptTemplate.from_template("You are a helpful, professional and concise AI that can analyse a user story with acceptance criteria and decide if sub-tasks are needed. If they are needed make sure to create sub-tasks with all the information possible.")

        promptTemplate = """
            Given the following user story and acceptance criteria create tasks in order to complete them if needed.
            A task should have a full description with everything needed for the engineer to complete the task including fields name that need creation or validation.
            Make the minimal tasks to complete the user story.
            
            user_story: {user_story}

            The output should follow the following format:
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
            created_issue = repo.create_issue(title=f"[Sub] US-{issue_id} : {task.title}", body=task.description, labels=["sub-task", "todo"])
            created_issue_list.append(IssueModel(id=created_issue.number, title=created_issue.title, body=created_issue.body))
        
        main_issue.add_to_labels("sub-tasks-created")
        
        return created_issue_list
    except:
        return {"error": "An error occurred!"}

@app.post("/repo/{repo_name}/{issue_id}/create-boilerplate")
async def generate_code(repo_name:str, issue_id: int):
    try:
        user = g.get_user(username)
        repo = user.get_repo(repo_name)
        issue = repo.get_issue(number=issue_id)

        branch_name = create_branch_AI(issue=issue, repo_name=repo_name)

        user_proxy = UserProxyAgent(
            name="Admin",
            system_message=f"A Human Admin. Interact with the MemGPT_coder execute the plan. Plan execution needs to be approved by this admin. Save the files generated using the functions defined.",
            human_input_mode="NEVER",
            function_map={
                "save": save
            },
            code_execution_config={"work_dir": "geekathon", "use_docker": "python:latest"},
            llm_config=llm_config
        )
        
        executor = AssistantAgent(
            name="Executor",
            system_message="Executor. Execute the code written by the engineer and report the result.",
            code_execution_config={"last_n_messages": 3, "work_dir": "geekathon"},
            llm_config=llm_config
        )
    
        coder = create_autogen_memgpt_agent(
            "MemGPT_coder",
            persona_description="MemGPT_coder. You are a engineer. You can write python/shell code to solve tasks. You know how to use FastAPI to create APIs. You want to make code able to complete a task. Wrap the code in a code block that specifies the script type. The user can't modify your code. So do not suggest incomplete code which requires others to modify. Check the execution result returned by the executor. If the result indicates there is an error, fix the error and output the code again.Suggest the full code instead of partial code or code changes. Make sure to save the file in the correct folder.",
            user_description=f"You are participating in a group chat with a user ({user_proxy.name}) and ({executor.name})",
            model="gpt-4-1106-preview"
        )

        groupchat = GroupChat(agents=[user_proxy, coder, executor], messages=[], max_round=12)
        manager = GroupChatManager(groupchat=groupchat, llm_config=llm_config)

        user_proxy.initiate_chat(manager, message=f"I would like to generate the code in Python using FastAPI to resolve the following task: {issue.body}. Do not execute bash commands that starts with 'uvicorn'. Save the files.")

        commit_changes(repo_name=repo_name, branch_name=branch_name, commit_message=f"feat/{issue_id}: resolve issue")

        pull_request = repo.create_pull(base="main", head=branch_name, title=f"{issue.title}", body=f"Resolves #{issue_id}")

        return {"success": pull_request.url}
    except:
        return {"error": "An error occurred!"}

@app.post("/repo/{repo_name}/{issue_id}/generate-code")
def generate_code(repo_name: str , issue_id: int):
    try:
        user = g.get_user(username)
        repo = user.get_repo(repo_name)
        issue = repo.get_issue(number=issue_id)

        branch_name = create_branch_AI(issue=issue, repo_name=repo_name)

        main_content = get_content("./geekathon/main.py")
        
        user_proxy = UserProxyAgent(
            name="Admin",
            system_message=f"Reply TERMINATE if the task has been solved at full satisfaction. Otherwise, reply CONTINUE, or the reason why the task is not solved yet.",
            is_termination_msg=lambda x: x.get("content", "") and x.get("content", "").rstrip().endswith("TERMINATE"),
            human_input_mode="NEVER",
            function_map={
                "save": save
            },
            code_execution_config={"work_dir": "geekathon", "use_docker": "python:latest"},
            llm_config=llm_config
        )
        
        executor = AssistantAgent(
            name="Executor",
            system_message="Executor. Execute and fix the code written by the engineer and report the result.",
            code_execution_config={"last_n_messages": 3, "work_dir": "geekathon"},
            llm_config=llm_config
        )
    
        engineer = AssistantAgent(
            name="Engineer",
            system_message="You are a engineer. You can write python/shell code to solve tasks. You know how to use FastAPI to create APIs. You want to make code able to complete a task. Wrap the code in a code block that specifies the script type. The user can't modify your code, so do not suggest incomplete code which requires others to modify. Check the execution result if the result indicates there is an error, fix the error and output the code again. Suggest the full code instead of partial code or code changes.",
            code_execution_config={"work_dir": "geekathon", "use_docker": "python:latest"},
            llm_config=llm_config
        )

        groupchat = GroupChat(agents=[user_proxy, engineer, executor], messages=[], max_round=12)
        manager = GroupChatManager(groupchat=groupchat, llm_config=llm_config)

        user_proxy.initiate_chat(manager, message=f"I would like to generate the code in Python using FastAPI to resolve the following task: {issue.body}. Add code to the present in the following Python script: ```Python {main_content}```. Save the files.")

        commit_changes(repo_name=repo_name, branch_name=branch_name, commit_message=f"feat/{issue_id}: resolve issue")

        pull_request = repo.create_pull(base="main", head=branch_name, title=f"{issue.title}", body=f"Resolves #{issue_id}")

        return {"sucess": pull_request.url}
    except:
        return {"error": "An error occurred!"}

@app.get("/repo/{repo_name}/{pull_id}/check-code")
def generate_code(repo_name: str , pull_id: int):
    try:
        user = g.get_user(username)
        repo = user.get_repo(repo_name)
        pull_request = repo.get_pull(pull_id)
        commit_sha = pull_request.get_commits().reversed[0].sha

        move_to_commit_hash(hash=commit_sha, repo=repo)

        code = get_content("./geekathon/main.py")

        chat = ChatOpenAI(temperature=0, openai_api_key=os.getenv('OPENAI_KEY'))

        system_message_prompt = SystemMessagePromptTemplate.from_template("You are a helpful, professional and concise AI that can analyse a user story with acceptance criteria and a file with Python code and see if all the tasks in the user story are done. Do not suggest code modifications.")

        promptTemplate = """
            Given the following user story with acceptance criteria and the following code, tell me if the code matches with everything asked.
            The code should complete in full the user story and all the acceptance criteria. Do not suggest code modifications, just say what is wrong.
            
            user_story: {user_story}

            python_code: {code}

            """

        human_message_prompt = HumanMessagePromptTemplate.from_template(promptTemplate)

        chat_prompt = ChatPromptTemplate(messages=[system_message_prompt, human_message_prompt])

        chat_messages = chat_prompt.format_prompt(user_story=pull_request.body, code=code).to_messages()

        result = chat(chat_messages)

        return {"result": result.content}
    except:
        return {"error": "An error occurred!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

