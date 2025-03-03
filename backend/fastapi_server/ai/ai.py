from fastapi import APIRouter, HTTPException, status,Security
from fastapi.responses import FileResponse, Response
from g4f import Client
from adapters.db_source import DatabaseAdapter
from adapters.tmdb import get_by_id
from fastapi.security import HTTPBearer
from utils.functions import get_user
from models.schemas import Film_to_front
from dotenv import load_dotenv
import random
import os
import httpx
from io import BytesIO
router = APIRouter()
Bear = HTTPBearer(auto_error=False)
client = Client()

@router.get("/search_desc")
async def search_by_description(description: str,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    db = DatabaseAdapter()
    db.connect()

    email_check = db.get_by_value('users', 'email', user["email"])

    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")

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

@router.get("/get-poster-by-url", status_code=status.HTTP_200_OK)
async def get_poster(url:str, os=None):
    try:
        if len(url) < 10:
            return
        if not url.endswith('jpg'):
            return
        headers = {
        "accept": "application/json",
        "Authorization": "Bearer " + os.getenv("TMDB_KEY")
        }
        requests = httpx.Client(proxy="socks5://77.81.138.114:6000", headers=headers)

        response = requests.get('https://image.tmdb.org/t/p/w200'+url)

        image_bytes = BytesIO(response.content)

        return Response(content=image_bytes.getvalue(), media_type="image/jpeg")
    except:
        raise HTTPException(status_code=404, detail="no image found with this url")