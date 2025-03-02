from fastapi import APIRouter, HTTPException, status,Security
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user

router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.post("/collections", status_code=status.HTTP_201_CREATED) 
async def create_collections(name:str,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:  
        raise HTTPException(status_code=404, detail="Invalid credentials")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    check_exist = adapter.execute_with_request(f"SELECT * from collections WHERE email = '{user['email']}' AND collection_name = '{name}'")
    if len(check_exist) > 0:
        raise HTTPException(status_code=404, detail="This collection already exists")
    adapter.insert('collections', {
        'email': user["email"],
        "collection_name": name
    })
    return {"success": True}

@router.get("/collections", status_code=status.HTTP_200_OK)
async def get_collections(token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    collections = adapter.get_by_value('collections', 'email', user["email"])
    for i in range(len(collections)):
        collections[i] = collections[i]["collection_name"]
    return collections

@router.delete("/collections", status_code=status.HTTP_200_OK)
async def delete_collections(name:str,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    check_exist = adapter.execute_with_request(f"SELECT * from collections WHERE email = '{user['email']}' AND collection_name = '{name}'")
    if len(check_exist) == 0:
        raise HTTPException(status_code=404, detail="This collection does not exists")
    adapter.execute_with_request(f"DELETE  from collections WHERE email = '{user['email']}' AND collection_name = '{name}'")
    return {"success": True}