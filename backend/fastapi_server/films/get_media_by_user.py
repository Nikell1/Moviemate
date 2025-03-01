from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Token, Film
from adapters.db_source import DatabaseAdapter
from adapters.tmdb import get_by_id
from fastapi.security import HTTPBearer
from utils.functions import get_user
from models.schemas import Film_to_front
router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.get("/get_films", status_code=status.HTTP_200_OK)
async def get_films(token:str = Security(Bear)):
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
    result = []
    print(await get_by_id(2))
    for i in range(len(films)):
        print(films[i]["media_id"])
        film =  await get_by_id(films[i]["media_id"],films[i]["media_type"] )
        new_film = Film_to_front(title=film.title,poster_path=film.poster_path,overview=film.overview,release_date=film.release_date,id=films[i]["media_id"],watched=films[i]["watched"])
        result.append(new_film)
    #возвращает список айдишников фильмов
    return result