from fastapi import APIRouter, HTTPException, status
from models.schemas import LogIn, Token
from adapters.db_source import DatabaseAdapter


router = APIRouter()


@router.post("/logout", response_model=None, status_code=status.HTTP_204_NO_CONTENT)
async def login(body: Token):
    adapter = DatabaseAdapter()
    adapter.connect()


    user = adapter.get_by_value('users', 'token', body.token)
    if len(user) == 0:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]

    adapter.execute_with_request(f"UPDATE users SET token = null WHERE email = '{user['email']}'")

