from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Token, Film
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
from models.TMDB import TMDBobject_Short
router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.get("/get_films", status_code=status.HTTP_200_OK)
async def add_media(token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    email_check = adapter.get_by_value('users', 'email', user["email"])
    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")
    films = adapter.get_by_value('films_to_users', 'email', user["email"])
    print(films)
    for i in range(len(films)):
        films[i] = films[i]["media_id"]  
    #возвращает список айдишников фильмов
    return films