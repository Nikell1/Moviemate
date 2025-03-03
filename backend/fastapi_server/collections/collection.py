from fastapi import APIRouter, HTTPException, status,Security, Response
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
from adapters.tmdb import get_by_id
import json
from pydantic import BaseModel

class Body(BaseModel):
    collection: str

class Body2(BaseModel):
    name: str

class Body3(BaseModel):
    name: str

router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.post("/collections", status_code=status.HTTP_201_CREATED) 
async def create_collections(body: Body2,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:  
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    name = body.name
    check_exist = adapter.execute_with_request(f"SELECT * from collections WHERE email = '{user['email']}' AND collection_name = '{name}'")
    if len(check_exist) > 0:
        raise HTTPException(status_code=409, detail="This collection already exists")
    adapter.insert('collections', {
        'email': user["email"],
        "collection_name": name
    })
    return {"success": True}

@router.get("/collections", status_code=status.HTTP_200_OK)
async def get_collections(token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    collections = adapter.get_by_value('collections', 'email', user["email"])
    for i in range(len(collections)):
        collections[i] = collections[i]["collection_name"]
    return collections

@router.delete("/collections", status_code=status.HTTP_204_NO_CONTENT)
async def delete_collections(body: Body3,token:str = Security(Bear)):
    user = get_user(token.credentials)
    name = body.name
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    request = f"SELECT * from collections WHERE email = '{user['email']}' AND collection_name = '{name}'"
    print(request)
    check_exist = adapter.execute_with_request(f"SELECT * from collections WHERE email = '{user['email']}' AND collection_name = '{name}'")
    if len(check_exist) == 0:
        raise HTTPException(status_code=404, detail="This collection does not exists")
    request = f"DELETE  from collections WHERE email = '{user['email']}' AND collection_name = '{name}'"
    print(request)
    adapter.execute_with_request(request)
    #films_to_Users collection = None
    check_exist = adapter.execute_with_request(f"UPDATE films_to_users SET collection = null WHERE email = '{user['email']}' AND collection ='{name}' RETURNING *")



@router.post("/get_films", status_code=status.HTTP_200_OK)
async def get_collection_media(body: Body, token:str = Security(Bear)):
    user = get_user(token.credentials)
    name = body.collection
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    result = []
    request = f"SELECT media_id FROM films_to_users WHERE email = '{user['email']}' AND collection = '{name}' "
    film_ids = adapter.execute_with_request(request=request)
    for film_id in film_ids:
        if film_id["media_id"]>=0:
            film = await get_by_id(film_id["media_id"])
            result.append(film.model_dump())
        else:
            film = adapter.get_by_id(table_name="films", id = -1 * film_id["media_id"])[0]
            result.append(film)
    return Response(status_code=200, content=json.dumps(result), media_type="application/json")