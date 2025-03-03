from fastapi import APIRouter, HTTPException,Security
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user

router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.put("/change_login", status_code=200)
async def change_login(login:str, token:str = Security(Bear)):
    print(token)
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    check_login = adapter.get_by_value('users', 'login', login)
    if len(check_login) != 0:
        raise HTTPException(status_code=409, detail="there is already an user with this login")
    user["login"] = login
    adapter.execute_with_request(f"UPDATE users SET login = '{login}' WHERE email = '{user['email']}'")
    return {"success": True}

# ДОБАВЬ ПРОВЕРКУ НА УНИКАЛЬНОСТЬ ЛОГИНА, ИНАЧЕ ВЕРНУТЬ КОД 409