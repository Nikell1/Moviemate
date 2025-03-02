from fastapi import APIRouter, HTTPException,Security
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user

router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.put("/change_login", status_code=200)
async def change_login(login:str, token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    user["login"] = login
    adapter.execute_with_request(f"UPDATE users SET login = {login} WHERE email = {user['email']}")
    return {"success": True}

# ДОБАВЬ ПРОВЕРКУ НА УНИКАЛЬНОСТЬ ЛОГИНА, ИНАЧЕ ВЕРНУТЬ КОД 409