from pydantic import BaseModel

class TrainingData(BaseModel):
    username: str
    model: str
    epoch: str
    batch: str