from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Token, Film,Add_media
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from urllib3 import request
from utils.functions import get_user
router = APIRouter()
Bear = HTTPBearer(auto_error=False)


@router.put("/set_collection", status_code=status.HTTP_201_CREATED)
async def create_media(,token:str = Security(Bear)):
