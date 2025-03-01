from fastapi import APIRouter, HTTPException, status, UploadFile
from models.schemas import Register, Token
from adapters.db_source import DatabaseAdapter
import bcrypt
from utils.functions import create_access_token
import json
import mimetypes
import shutil
import g4f
import base64
import os
router = APIRouter()


@router.post("/recognition", response_model=str, status_code=status.HTTP_200_OK)
async def get_movie_by_screenshot(file: UploadFile):

    allowed_extensions = [
        "jpg",  
        "jpeg", 
        "png",  
        "gif",  
        "bmp",  
        "tiff", 
        "webp", 
        "ico",  
        "svg"
    ]

    mime_type, _ = mimetypes.guess_type(file.filename)
    file_extension = mime_type.split("/")[1]
    if file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail="your file is not a valid image")
    
    file_location = f"backend/temporary_images/{file.filename}"
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with open(file_location, "rb") as image_file:
        base64_image = base64.b64encode(image_file.read()).decode("utf-8")

    response = g4f.ChatCompletion.create(
        model=g4f.models.gpt_4,
        messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Дай мне только название фильма, скриншот из которого на изображении"},
            {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
        ]
    }],
        

        timeout=120, # in secs
    )
    os.remove(file_location)

    print(f"Result:", response)


    return response