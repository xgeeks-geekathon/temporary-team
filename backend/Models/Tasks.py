from pydantic import BaseModel, Field

from Models.Task import Task


class Tasks(BaseModel):
    tasks: list[Task] = Field(description="List of tasks")
    
