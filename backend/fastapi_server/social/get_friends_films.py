from fastapi import APIRouter, HTTPException, status,Security
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
from adapters.tmdb import get_by_id
from models.schemas import Film_to_front
router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.get("/get_friends_films", status_code=status.HTTP_200_OK)
async def get_friends_films(friends_login:str,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    email_check = adapter.get_by_value('users', 'email', user["email"])
    check = adapter.execute_with_request(f"SELECT * from friends WHERE user1 = '{user['login']}' AND user2 = {friends_login} AND status = 'complete'")
    if len(check) == 0:
        raise HTTPException(status_code=404, detail="You do not have this friend")
    check = adapter.execute_with_request(f"SELECT * from friends WHERE user2 = '{user['login']}' AND user1 = {friends_login} AND status = 'complete'")
    if len(check) == 0:
        raise HTTPException(status_code=404, detail="You do not have this friend")
    friend = adapter.get_by_value('films_to_users', 'login', friends_login)
    films = adapter.get_by_value('films_to_users', 'email', friend["email"])
    result = []
    for i in range(len(films)):
        if films[i]["media_id"] >= 0:
            film =  await get_by_id(films[i]["media_id"],films[i]["media_type"])
            new_film = Film_to_front(title=film.title,poster_path=film.poster_path,overview=film.overview,release_date=film.release_date,id=films[i]["media_id"],watched=films[i]["watched"])
        else:
            film = adapter.get_by_value('films', 'id',-1*films[i]["media_id"])[0]
            new_film = Film_to_front(title=film["title"],poster_path=film["image_url"],overview=film["description"],release_date=film["date"],id=films[i]["media_id"],watched=films[i]["watched"])
        result.append(new_film)
    #возвращает список айдишников фильмов
    return result