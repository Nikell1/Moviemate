from fastapi import APIRouter, HTTPException, status
from models.schemas import LogIn, LogInResponse
from adapters.db_source import DatabaseAdapter
import bcrypt
from utils.functions import create_access_token
import json

router = APIRouter()


@router.post("/login", response_model=LogInResponse, status_code=status.HTTP_200_OK)
async def login(body: LogIn):
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    print(body)
    user = adapter.get_by_value('users', 'email', body.email)
    if len(user) == 0:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    user = user[0]
    bytes_hashed_password = user["password"].encode('utf-8')
    pd_check = bcrypt.checkpw(body.password.encode('utf-8'), bytes_hashed_password)
    if not pd_check:
        raise HTTPException(status_code=404, detail="Invalid credentials")

    new_token = create_access_token({
        'email': body.email
    })
    adapter.execute_with_request(f"UPDATE users SET token = '{new_token}' WHERE email = '{body.email}'")

    return LogInResponse(
        token=new_token,
        login=user['login']
    )
