from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Token, Film,Add_media
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from urllib3 import request
from utils.functions import get_user
router = APIRouter()
Bear = HTTPBearer(auto_error=False)


@router.put("/create_film", status_code=status.HTTP_201_CREATED)
async def create_media(body: Film,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    films = adapter.get_by_value('films', 'title', body.title)
    if len(films) != 0:
        raise HTTPException(status_code=404, detail="Media with this title already exist")
    adapter.insert('films', {
        'title': body.title,
        'description':  body.description,
        "date": body.date,
        "image_url": body.image_url
    })
    return {"success": True}

