from fastapi import APIRouter, HTTPException,Security
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.put("/mark_as_watched", status_code=200)
async def mark_as_watched(id:int, token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = user[0]
    db = DatabaseAdapter()
    db.connect()

    email_check = db.get_by_value('users', 'email', user["email"])
    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")

    request = f"""SELECT * FROM films_to_users WHERE email='{email_check[0]["email"]}' and media_id={id}"""
    ftu = db.execute_with_request(request)[0]
    ftu["watched"] = not ftu["watched"]

    request = f"""UPDATE films_to_users SET watched={ftu["watched"]} WHERE email='{email_check[0]["email"]}' and media_id={id}"""
    db.execute_with_request(request)

    return ftu["watched"]



