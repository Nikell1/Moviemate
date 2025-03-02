from fastapi import APIRouter, HTTPException, status,Security
from fastapi.security import HTTPBearer

from models.schemas import Search
from utils.functions import get_user
from adapters.tmdb import search_multi
router = APIRouter()
Bear = HTTPBearer(auto_error=False)


@router.post("/search_film", status_code=status.HTTP_200_OK)
async def search_film(search: str, body: Search, token:str = Security(Bear)):
    user = get_user(token.credentials)
    print(body)
    print(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    media = await search_multi(search,limit=19,release_date_high=body.release_date_high, release_date_low=body.release_date_low, genre_ids=body.genre_ids)
    return media
