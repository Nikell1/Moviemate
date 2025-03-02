from fastapi import APIRouter, HTTPException, status,Security
from fastapi.security import HTTPBearer
from utils.functions import get_user
from adapters.tmdb import search_multi
router = APIRouter()
Bear = HTTPBearer(auto_error=False)


@router.get("/search_film", status_code=status.HTTP_200_OK)
async def search_film(search: str, token:str = Security(Bear)):
    user = get_user(token.credentials)
    print(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    media = await search_multi(search,limit=19)
    return media
