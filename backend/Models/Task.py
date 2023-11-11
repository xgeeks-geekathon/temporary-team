from pydantic import BaseModel, Field


class Task(BaseModel):
    order_of_execution: str = Field(description="order of execution of the task")
    description: str = Field(description="description of the task")
    title: str = Field(description="title of the task")