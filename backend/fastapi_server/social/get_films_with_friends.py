from fastapi import APIRouter, HTTPException, status,Security
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
from adapters.tmdb import get_by_id
from models.schemas import Film_to_front
from g4f.client import Client
router = APIRouter()
Bear = HTTPBearer(auto_error=False)
client = Client()


#@router.post("/get_film_with_friends", status_code=status.HTTP_200_OK)
async def get_film_with_friends(friend_logins:str,token:str = Security(Bear)):
    friend_logins = [friend_logins]
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    friend_logins.append(user["login"]) 
    summ_films = {}
    films_names = []
    for friend_login in friend_logins:
        if friend_login != user["login"]:
            check = adapter.execute_with_request(f"""SELECT * FROM friends WHERE (user1='{friend_login}' and user2='{user['login']}') or (user1='{user['login']}' and user2='{friend_login}')""")
            if len(check) == 0:
                raise HTTPException(status_code=404, detail="You do not have this friend")
        friend = adapter.get_by_value('users', 'login', friend_login)
        films = adapter.get_by_value('films_to_users', 'email', friend[0]["email"])
        for i in range(len(films)):
            if films[i]["media_id"] >= 0:
                film =  await get_by_id(films[i]["media_id"],films[i]["media_type"])
                new_film = Film_to_front(title=film.title,poster_path=film.poster_path,overview=film.overview,release_date=film.release_date,id=films[i]["media_id"],watched=films[i]["watched"])
                films_names.append(film.title)
                summ_films[film.title] = new_film
            else:
                film = adapter.get_by_value('films', 'id',-1*films[i]["media_id"])[0]
                new_film = Film_to_front(title=film["title"],poster_path=film["image_url"],overview=film["description"],release_date=film["date"],id=films[i]["media_id"],watched=films[i]["watched"])
                summ_films[film["title"]] = new_film
                if film["title"] in films_names:
                    return new_film
                films_names.append(film["title"])
    if len(films_names) == 0:
        film =  await get_by_id(680,"movie")
        film = Film_to_front(title=film.title,poster_path=film.poster_path,overview=film.overview,release_date=film.release_date,id=680,watched=False)
        return film
    response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": f"Дай мне только название фильма в том же виде как тебе его написал я из списка,который больше остальных обобщает данный список,если какой-то фильм повторяется верни его: {','.join(films_names)}"}],
    timeout=100, 
        )
    title = response.choices[0].message.content
    return summ_films[title]

