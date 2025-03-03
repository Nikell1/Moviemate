from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Add_media
from adapters.db_source import DatabaseAdapter
from adapters import tmdb
from fastapi.security import HTTPBearer
from utils.functions import get_user
router = APIRouter()
Bear = HTTPBearer(auto_error=False)


@router.post("/film", status_code=status.HTTP_201_CREATED)
async def add_media(body: Add_media,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    email_check = adapter.get_by_value('users', 'email', user["email"])

    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")
    check_exist = adapter.execute_with_request(f"SELECT * from films_to_users WHERE email = '{user['email']}' AND media_id = {body.media_id} AND media_type='{body.media_type}'")
    if len(check_exist) > 0:
        raise HTTPException(status_code=409, detail="This film already added")

    media_get = await tmdb.get_by_id(body.media_id, body.media_type, short=False)
    moods = await tmdb.get_moods_by_genres(media_get.genres)

    adapter.insert('films_to_users', {
        'email': user["email"],
        'media_id':  body.media_id,
        "collection": body.collection,
        "media_type": body.media_type,
        "moods": moods
    })
    return {"success": True}

@router.delete("/film", status_code=status.HTTP_204_NO_CONTENT)
async def del_media(media_id: int,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    db = DatabaseAdapter()
    db.connect()

    email_check = db.get_by_value('users', 'email', user["email"])

    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")
    check_exist = db.execute_with_request(f"SELECT * from films_to_users WHERE media_id = {media_id}")
    if len(check_exist) == 0:
        raise HTTPException(status_code=404, detail="No media Found")
    check_available = db.execute_with_request(f"SELECT * from films_to_users WHERE media_id = {media_id} AND email = '{user['email']}' ")
    if media_id >= 0:
        request = f"""DELETE FROM films_to_users WHERE email='{email_check[0]["email"]}' and media_id={media_id}"""
        db.execute_with_request(request)
    else:
        if len(check_available) > 0:
            request = f"""DELETE FROM films WHERE id= ( {media_id} * -1 )"""
            db.execute_with_request(request)
            request = f"""DELETE FROM films_to_users WHERE email='{email_check[0]["email"]}' and media_id={media_id}"""
            db.execute_with_request(request)
        else:
            raise HTTPException(status_code=403, detail="This media is not available for you")

    return {"success": True}