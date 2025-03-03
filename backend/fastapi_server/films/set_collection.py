from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Set_collection
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
router = APIRouter()
Bear = HTTPBearer(auto_error=False)


@router.put("/set_collection", status_code=status.HTTP_201_CREATED)
async def set_collection(body:Set_collection,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()

    film = adapter.execute_with_request(f"SELECT * from films_to_users WHERE email = '{user['email']}' AND media_id = {body.media_id}")
    if len(film) == 0:
        raise HTTPException(status_code=404, detail="Media not found")
    film = film[0]
    check_exist = adapter.execute_with_request(f"SELECT * from films_to_users WHERE email = '{user['email']}' AND collection = '{body.collection}' AND media_id = '{body.media_id}'")
    if len(check_exist) > 0:
        raise HTTPException(status_code=409, detail="Media is already in collection")
    film["collection"] = body.collection
    adapter.update('films_to_users',film,film["id"])
    return {"success": True}