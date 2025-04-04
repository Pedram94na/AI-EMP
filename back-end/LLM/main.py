from fastapi import FastAPI, UploadFile, Body, File, Form, Header, Query, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.background import BackgroundTask
import uvicorn, os

from services.file.file_controller import process_file
from services.llm.llm_controller import train_model, test_model, get_all_directories, fetch_model
from models.user_message import UserMessage
from models.training_data import TrainingData

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ai/training")
async def start_training(username: str = Form(...),
                         model: str = Form(...),
                         epoch: str = Form(...),
                         batch: str = Form(...),
                         file: UploadFile = File(...)):
    
    if not username:
        return JSONResponse(content={"error": "Username is missing"}, status_code=400)
    
    if not file:
        return JSONResponse(content={"error": "No file received"}, status_code=400)
    
    if not epoch or not batch:
        raise JSONResponse(content={"error": "Parameters are missing"}, status_code=400)
        
    if not model:
        model = None

    try:
        await process_file(file, username)
        
        train_model(username, int(epoch), int(batch), model)
        
        return JSONResponse(content={"message": "Training started successfully"}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=400, detail="Unexpected error")

@app.post("/ai/testing")
def start_testing(data: UserMessage = Body(...)):
    if not data.username:
        return JSONResponse(content={"error": "Username is missing"}, status_code=400)
    
    if not data.message:
        return JSONResponse(content={"error": "Message is missing"}, status_code=400)

    if not data.training_date:
        return JSONResponse(content={"error": "Training date is missing"}, status_code=400)

    response = test_model(data.message, data.username, data.training_date)
    
    return JSONResponse(content={"message": response}, status_code=200)

@app.get("/ai")
async def get_all(username: str = Header(...)):
    if not username:
        raise HTTPException(status_code=400, detail="Username is missing in header")
    
    all_directories = get_all_directories(username)

    return JSONResponse(content={"directories": all_directories}, status_code=200)

@app.get("/ai/download")
async def download_model(username: str = Header(...), date: str = Query(...)):
    if not username:
        raise HTTPException(status_code=400, detail="Username is missing in header")
    
    if not date:
        raise HTTPException(status_code=400, detail="Date is missing in query parameter")

    zip_filename = fetch_model(username, date)

    if not os.path.exists(zip_filename):
        raise HTTPException(status_code=404, detail="Model file not found")

    def cleanup():
        os.remove(zip_filename)

    return FileResponse(zip_filename, media_type="application/zip", filename="model_package.zip", background=BackgroundTask(cleanup))

if __name__ == '__main__':
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
