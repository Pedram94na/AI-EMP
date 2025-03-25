from pydantic import BaseModel

class UserMessage(BaseModel):
    username: str
    message: str
    training_date: str
