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

    print(body)
    print(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")

    media = await search_multi(search,limit=19,release_date_high=body.release_date_high, release_date_low=body.release_date_low, genre_ids=body.genre_ids, watched=body.watched, email=user['email'])
    return media



