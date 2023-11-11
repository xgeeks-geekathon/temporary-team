# Create Issue Model using Pydantic
from pydantic import BaseModel

class IssueModel(BaseModel):
    id: str
    title: str
    body: str