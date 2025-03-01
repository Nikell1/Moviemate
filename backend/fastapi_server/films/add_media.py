from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Token, Film
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.put("/add_film", status_code=status.HTTP_201_CREATED)
async def add_media(media_id: int,media_type:str = "movie" ,collection:str = None,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    email_check = adapter.get_by_value('users', 'email', user["email"])
    print(email_check)
    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")
    check_exist = adapter.execute_with_request(f"SELECT * from films_to_users WHERE email = '{user['email']}' AND media_id = {media_id}")
    if len(check_exist) > 0:
                raise HTTPException(status_code=404, detail="This film already exists")
    adapter.insert('films_to_users', {
        'email': user["email"],
        'media_id':  media_id,
        "collection": collection,
        "media_type": media_type
    })
    return {}
