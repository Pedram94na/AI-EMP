from fastapi import FastAPI, UploadFile, File, Header, HTTPException
from fastapi.responses import JSONResponse
import uvicorn

from file.file_type import get_reader2
from models.model import train_model, test_model

app = FastAPI()

@app.post("/ai/training")
async def start_training(file: UploadFile = File(...)):
    reader = await get_reader2(file)
    reader.process_data()

    train_model()
    
    return JSONResponse(content={"message": "Training started successfully"}, status_code=200)

@app.post("/ai/testing")
async def start_testing(user_message):
    result = await test_model(user_message)

    return JSONResponse(content={"message": result}, status_code=200)

@app.post("/ai")
async def get_model(id: str = Header(...)):
    if not x_id:
        raise HTTPException(status_code=400, detail="ID is missing in headers")
    
    # Fetch the latest saved model of the given id

    return JSONResponse(content={"message": ""}, status_code=200)

if __name__ == '__main__':
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
