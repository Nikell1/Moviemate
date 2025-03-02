from fastapi import APIRouter, HTTPException, status,Security
from fastapi.security import HTTPBearer

from models.schemas import Search
from utils.functions import get_user
from adapters.tmdb import search_multi

router = APIRouter()
Bear = HTTPBearer(auto_error=False)


@router.get("/search_film", status_code=status.HTTP_200_OK)
async def search_film(body: Search, search: str, token:str = Security(Bear)):
    print(body)
    user = get_user(token.credentials)
    print(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    media = await search_multi(search,limit=19, genre_ids=body.genre_ids, release_date_low=body.release_date_low, release_date_high=body.release_date_high)

    return media
