from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Token, Film
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
from models.TMDB import TMDBobject_Short

router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.put("/change_login", status_code=200)
async def change_login(login:str, token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=501, detail="Invalid credentials")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    user["login"] = login
    adapter.execute_with_request(f"UPDATE users SET login = {login} WHERE email = {user['email']}")
    return {"success": True}