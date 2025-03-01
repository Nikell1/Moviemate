from fastapi import APIRouter, HTTPException, status
from models.schemas import Register, Token
from adapters.db_source import DatabaseAdapter
import bcrypt
from utils.functions import create_access_token
import json

router = APIRouter()


@router.post("/register", response_model=Token, status_code=status.HTTP_200_OK)
async def register(body: Register):
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()

    email_check = adapter.get_by_value('users', 'email', body.email)
    if len(email_check) != 0:
        raise HTTPException(status_code=404, detail="User with this email already exists")
    
    login_check = adapter.get_by_value('users', 'login', body.login)
    if len(login_check) != 0:
        raise HTTPException(status_code=404, detail="User with this login already exists")

    hash_password = bcrypt.hashpw(body.password.encode('utf-8'), bcrypt.gensalt())
    hash_password = str(hash_password)[2:-1]

    new_token = create_access_token({
        'email': body.email
    })

    adapter.insert('users', {
        'email': body.email,
        'login':  body.login,
        'password': hash_password,
        'token': new_token
    })

    return {'token':new_token}
    