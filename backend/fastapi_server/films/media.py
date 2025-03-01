from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Token, Film,Add_media
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from urllib3 import request
from utils.functions import get_user
router = APIRouter()
Bear = HTTPBearer(auto_error=False)


@router.put("/film", status_code=status.HTTP_201_CREATED)
async def add_media(body: Add_media,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    email_check = adapter.get_by_value('users', 'email', user["email"])

    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")
    check_exist = adapter.execute_with_request(f"SELECT * from films_to_users WHERE email = '{user['email']}' AND media_id = {body.media_id}")
    if len(check_exist) > 0:
        raise HTTPException(status_code=404, detail="This film already exists")
    adapter.insert('films_to_users', {
        'email': user["email"],
        'media_id':  body.media_id,
        "collection": body.collection,
        "media_type": body.media_type
    })
    return {"success": True}

@router.delete("/film", status_code=status.HTTP_201_CREATED)
async def del_media(media_id: int,token:str = Security(Bear)):
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
    check_exist = db.execute_with_request(f"SELECT * from films_to_users WHERE email = '{user['email']}' AND media_id = {media_id}")
    if len(check_exist) == 0:
        raise HTTPException(status_code=404, detail="No Film Found")

    request = f"""DELETE FROM films_to_users WHERE email='{email_check[0]["email"]}' and media_id={media_id}"""
    db.execute_with_request(request)

    return {"success": True}