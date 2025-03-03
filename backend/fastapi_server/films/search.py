from fastapi import APIRouter, HTTPException, status,Security
from fastapi.security import HTTPBearer
from g4f.client import Client
from adapters.db_source import DatabaseAdapter
from models.schemas import Search
from utils.functions import get_user
from adapters.tmdb import search_multi
router = APIRouter()
Bear = HTTPBearer(auto_error=False)
client = Client()

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

@router.get("/search_desc")
async def search_by_description(description: str,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    db = DatabaseAdapter()
    db.connect()

    email_check = db.get_by_value('users', 'email', user["email"])

    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user",
                   "content": f"Дай мне только название фильма по его описанию. Кроме названия ты не должен ничего возвращать. Описание: {description}"}],
        timeout=100,
    )
    title = response.choices[0].message.content

    if len(title) > 20:
        return {"title": "Не найдено"}

    return {"title": title}

