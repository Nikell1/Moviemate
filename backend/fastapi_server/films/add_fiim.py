from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Token, Film
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.post("/add_film", status_code=status.HTTP_201_OK)
async def add_film(film: Film,token:str = Security(Bear)):
    user = get_user(token)
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    email_check = adapter.get_by_value('users', 'email', user["email"])
    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")

    adapter.insert('films_to_users', {
        'email': user[email],
        'login':  film.login,
    })
    pass
