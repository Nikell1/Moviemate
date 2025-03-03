from fastapi import APIRouter, HTTPException, status,Security
from fastapi.responses import FileResponse, Response
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


load_dotenv()

@router.get("/get-poster-by-url", status_code=status.HTTP_200_OK)
async def get_poster(url:str):
    try:
        if len(url) < 10:
            return 
        if not url.endswith('jpg'):
            return 
        headers = {
        "accept": "application/json",
        "Authorization": "Bearer " + os.getenv("TMDB_KEY")
        }
        requests = httpx.Client(proxy="socks5://142.54.237.38:4145", headers=headers)

        response = requests.get('https://image.tmdb.org/t/p/w200'+url)

        image_bytes = BytesIO(response.content)

        return Response(content=image_bytes.getvalue(), media_type="image/jpeg")
    except:
        raise HTTPException(status_code=404, detail="no image found with this url")
