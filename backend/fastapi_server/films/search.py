from fastapi import APIRouter, HTTPException, status,Security
from fastapi.security import HTTPBearer
from utils.functions import get_user
from adapters.tmdb import search_multi
router = APIRouter()
Bear = HTTPBearer(auto_error=False)


@router.get("/search_film", status_code=status.HTTP_200_OK)
async def search_film(search: str, token:str = Security(Bear)):
    moods = {
        "Весёлое": [35, 12, 10751, 10402],
        "Серьёзные": [18, 36, 10749, 99, 35],
        "Напряженные": [28, 53, 27, 9648, 878, 18]
    }


    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    user = user[0]
    media = await search_multi(search,limit=19)
    return media
