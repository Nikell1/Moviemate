from fastapi import APIRouter, HTTPException, status,Security
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
from adapters.tmdb import get_by_id
from models.schemas import Film_to_front
router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.get("/get_friends_films", status_code=status.HTTP_200_OK)
async def get_friends_films(friend_login:str,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()


    email_check = adapter.get_by_value('users', 'email', user["email"])
    if email_check == []:
        raise HTTPException(status_code=404, detail="No user with that email found")

    check = adapter.execute_with_request(f"""SELECT * FROM friends WHERE (user1='{friend_login}' and user2='{user['login']}') or (user1='{user['login']}' and user2='{friend_login}')""")
    if len(check) == 0:
        raise HTTPException(status_code=404, detail="You do not have this friend")

    friend = adapter.get_by_value('users', 'login', friend_login)
    films = adapter.get_by_value('films_to_users', 'email', friend[0]["email"])
    result = []

    for i in range(len(films)):
        if films[i]["media_id"] >= 0:
            film =  await get_by_id(films[i]["media_id"],films[i]["media_type"])
            new_film = Film_to_front(title=film.title,poster_path=film.poster_path,overview=film.overview,release_date=film.release_date,id=films[i]["media_id"],watched=films[i]["watched"])
        else:
            film = adapter.get_by_value('films', 'id',-1*films[i]["media_id"])[0]
            new_film = Film_to_front(title=film["title"],poster_path=film["image_url"],overview=film["description"],release_date=film["date"],id=films[i]["media_id"],watched=films[i]["watched"])
        result.append(new_film)

    return result