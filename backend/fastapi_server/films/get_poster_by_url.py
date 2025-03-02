from fastapi import APIRouter, HTTPException, status,Security
from fastapi.responses import FileResponse
from adapters.db_source import DatabaseAdapter
from adapters.tmdb import get_by_id
from fastapi.security import HTTPBearer
from utils.functions import get_user
from models.schemas import Film_to_front
from dotenv import load_dotenv
import random
import os
import httpx
router = APIRouter()


load_dotenv()

@router.get("/get-poster-by-url", status_code=status.HTTP_200_OK)
async def get_poster(url:str):
    try:
        print(url)
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

        print(response)
        with open(f"backend/temporary_images{url}", "wb") as f:
            f.write(response.content)
        
        return FileResponse(f"backend/temporary_images{url}", media_type="image/jpg")
    except:
        raise HTTPException(status_code=404, detail="no image found with this url")
    finally:
        try:
            os.remove(f"backend/temporary_images{url}")
        except:
            pass