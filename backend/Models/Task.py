from pydantic import BaseModel, Field


class Task(BaseModel):
    order_of_execution: str = Field(description="order of execution of the task")
    assigned_to: str = Field(description="who is the task assigned to")
    description: str = Field(description="description of the task")
    title: str = Field(description="title of the task")