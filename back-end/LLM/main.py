from fastapi import FastAPI, UploadFile, File, Header, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from file.file_type import get_reader2
from llm.llm_controller import train_model, test_model, fetch_model
from models.user_message import UserMessage

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ai/training")
async def start_training(file: UploadFile = File(...), id: str = Header(...)):
    if not id:
        raise HTTPException(status_code=400, detail="ID is missing in headers")
    
    if not file:
        return JSONResponse(content={"error": "No file received"}, status_code=400)
        
    reader = await get_reader2(file, id)
    reader.process_data()

    train_model(id)
    return JSONResponse(content={"message": "Training started successfully"}, status_code=200)

@app.post("/ai/testing")
def start_testing(user_message: UserMessage, id: str = Header(...)):
    if not id:
        raise HTTPException(status_code=400, detail="ID is missing in headers")
    
    response = test_model(user_message.message, id)

    return JSONResponse(content={"message": response}, status_code=200)

@app.get("/ai")
async def get_model(id: str = Header(...)):
    if not id:
        raise HTTPException(status_code=400, detail="ID is missing in headers")
    
    zip_filename = fetch_model(id)
    
    return FileResponse(path=zip_filename, media_type='application/zip', filename=zip_filename)

if __name__ == '__main__':
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
