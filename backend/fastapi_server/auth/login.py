from fastapi import APIRouter, HTTPException, status
from models.schemas import LogIn, LogInResponse
from adapters.db_source import DatabaseAdapter
import bcrypt
import os
import dotenv
from utils.functions import create_access_token

router = APIRouter()


@router.post("/login", response_model=LogInResponse, status_code=status.HTTP_200_OK)
async def login(body: LogIn):
    adapter = DatabaseAdapter()
    adapter.connect()

    print(body)
    user = adapter.get_by_value('users', 'email', body.email)
    if len(user) == 0:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user = user[0]
    bytes_hashed_password = user["password"].encode('utf-8')
    pd_check = bcrypt.checkpw(body.password.encode('utf-8'), bytes_hashed_password)
    if not pd_check:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if body.email not in ["friend@example.com","admin@example.com"]:
        new_token = create_access_token({
            'email': body.email
        })
    elif body.email == "admin@example.com":
        new_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiZXhwIjoxNzQxMDUwOTU1fQ.v-N50e06R55-dp__TcVLNNsqYCG2V7TIed7ZAkMWxKE"
    else:
        new_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyaWVuZEBleGFtcGxlLmNvbSIsImV4cCI6MTc0MTA1MDk1NX0.UCfCQRK4F-sl6uX5S4sahhe7z0l499383K7Ra6NLyQg"
    adapter.execute_with_request(f"UPDATE users SET token = '{new_token}' WHERE email = '{body.email}'")

    return LogInResponse(
        token=new_token,
        login=user['login']
    )
