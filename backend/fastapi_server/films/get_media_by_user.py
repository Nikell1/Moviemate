from fastapi import APIRouter, HTTPException, status,Security
from adapters.db_source import DatabaseAdapter
from adapters.tmdb import get_by_id
from fastapi.security import HTTPBearer
from utils.functions import get_user
from models.schemas import Film_to_front
import random
router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.get("/get_films", status_code=status.HTTP_200_OK)
async def get_films(token:str = Security(Bear)):
    print(token)
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    email_check = adapter.get_by_value('users', 'email', user["email"])
    if len(email_check) == 0:
        print(2)
        raise HTTPException(status_code=409, detail="User with this email does not exist")
    films = adapter.get_by_value('films_to_users', 'email', user["email"])
    result = []
    print(films)
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

@router.get("/get_rand_film", status_code=status.HTTP_200_OK)
async def get_rand_film(mood:str=None,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    db = DatabaseAdapter()
    db.connect()
    db.initialize_tables()
    email_check = db.get_by_value('users', 'email', user["email"])
    if len(email_check) == 0:
        raise HTTPException(status_code=409, detail="User with this email does not exists")

    request = f"""SELECT * FROM films_to_users WHERE email='{user["email"]}' and watched=false """
    if mood != None:
        request += f"""and '{mood}' = any(moods)"""


    films = db.execute_with_request(request)
    print(films)
    result = []
    print(await get_by_id(2))
    for i in range(len(films)):
        if films[i]["media_id"] >= 0:
            film =  await get_by_id(films[i]["media_id"],films[i]["media_type"])
            new_film = Film_to_front(title=film.title,poster_path=film.poster_path,overview=film.overview,release_date=film.release_date,id=films[i]["media_id"],watched=films[i]["watched"])
        else:
            film = db.get_by_value('films', 'id',-1*films[i]["media_id"])[0]
            print(film)
            new_film = Film_to_front(title=film["title"],poster_path=film["poster_path"],overview=film["overview"],release_date=film["release_date"],id=films[i]["media_id"],watched=films[i]["watched"])

        result.append(new_film)
    if result != []:
        return random.choice(result)
    else:
        return {}