from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Token, Film
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
from adapters.tmdb import search_multi
router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.get("/search_film", status_code=status.HTTP_200_OK)
async def add_media(search: str,token:str = Security(Bear)):
    media = search_multi(search)
    return media
