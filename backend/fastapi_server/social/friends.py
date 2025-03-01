from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Token, Film
from adapters.db_source import DatabaseAdapter
from adapters.tmdb import get_by_id
from adapters.mail import send_invite
from fastapi.security import HTTPBearer
from utils.functions import get_user
from models.schemas import Film_to_front
import random

router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.put("/friend", status_code=status.HTTP_200_OK)
async def add_friend(friend_login:str, token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    user = user[0]
    db = DatabaseAdapter()
    db.connect()
    db.initialize_tables()

    email_check = db.get_by_value('users', 'email', user["email"])
    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")

    friend = db.get_by_value('users', 'login', friend_login)
    if friend == []:
        raise HTTPException(status_code=404, detail="Net idi nafek (No user found)")

    check_if_already_pending = f"""SELECT * FROM friends WHERE user1='{user['login']}'"""

    if check_if_already_pending != []:
        raise HTTPException(status_code=403, detail="Already sent invite")


    request = {
        "user1": user["login"],
        "user2": friend_login,
        "status": "pending"
    }
    db.insert('friends', request)

    await send_invite(friend[0]['email'], user['login'])

    return {"ok": True}
