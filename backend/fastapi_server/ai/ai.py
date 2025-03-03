from fastapi import APIRouter, HTTPException, status, Security, UploadFile
from g4f import Client
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
import mimetypes
import shutil
import g4f
import base64
import os
router = APIRouter()
Bear = HTTPBearer(auto_error=False)
client = Client()

@router.get("/search_desc")
async def search_by_description(description: str):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user",
                   "content": f"Дай мне только название фильма по его описанию. Кроме названия ты не должен ничего возвращать. Описание: {description}"}],
        timeout=100,
    )
    title = response.choices[0].message.content

    if len(title) > 20:
        return {"title": "Не найдено"}

    return {"title": title}


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
                {"type": "text", "text": "Дай мне только название фильма, скриншот из которого на изображении "},
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
            ]
        }],

        timeout=10,  # in secs
    )
    os.remove(file_location)

    print(f"Result:", response)

    return response