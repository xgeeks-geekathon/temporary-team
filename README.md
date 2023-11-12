<div align="center">
<h1 align="center">
<img src="https://media1.giphy.com/media/C4YBNGBh70MzatKz0m/giphy.gif?cid=ecf05e47l88l06yj6xo98i7ujlkhstm98gtucukskp2ssqp9&ep=v1_gifs_search&rid=giphy.gif&ct=g" width="100" />
<br>TEMPORARY-TEAM</h1>


## ⚠️ Problem
    Image a world where with simple clicks you can manage git and write code based on an User Story.

## 🫡 Description
    <h1> Welcome to Temp Project! </h1>

    With our solution and a user story with acceptance criteria you can:

    - Generate automatically sub-task on GitHub.
    - Automatically create branches, generate new code and open pull requests based on the task.
    - Check if your code completes all the requirements of a task.

## ⏭️ Next Steps

- Integrate with more platforms (Jira, GitLab & so on).
- Use MemGPT to allow the him to have full context of the repository.
- Generate code in more languages.
- Use multi agents to run, execute, test, suggest improvements and more.

## 🏃 How to Run

FrontEnd:

1.
```sh
yarn install
```

2.
```sh
yarn start
```

Backend:

1.
```
poetry install
```

2.
```
uvicorn main:app
```


## 👥 Awesome Team

Proudly made by Francisco Gaspar, Rúben Carreira and Sara Nóbrega.

<h1 align="center">
<img src="https://i.giphy.com/media/1d7F9xyq6j7C1ojbC5/giphy.webp" width="100" />
<br> Thank you!</h1>

## 📂 Repository Structure

```sh
└── temporary-team/
    ├── backend/
    │   ├── Models/
    │   │   ├── IssueModel.py
    │   │   ├── Task.py
    │   │   └── Tasks.py
    │   ├── main.py
    │   ├── poetry.lock
    │   ├── pyproject.toml
    │   └── requirements.txt
    └── fe/
        ├── package.json
        ├── public/
        │   ├── index.html
        │   ├── manifest.json
        │   └── robots.txt
        ├── src/
        │   ├── App.tsx
        │   ├── components/
        │   ├── fetcher.tsx
        │   ├── index.tsx
        │   ├── pages/
        │   ├── react-app-env.d.ts
        │   ├── reportWebVitals.ts
        │   ├── setupTests.ts
        │   ├── types.ts
        │   └── utils.tsx
        ├── tsconfig.json
        └── yarn.lock

```