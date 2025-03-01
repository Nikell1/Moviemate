from fastapi import APIRouter, HTTPException, status,Security
from backend.models.schemas import Token, Film
from backend.adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from backend.utils.functions import get_user
from backend.models.TMDB import TMDBobject_Short

router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.put("/switch_film/{id}", status_code=201)
async def switch_film(id:int, token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=501, detail="Invalid credentials")

    user = user[0]
    db = DatabaseAdapter()
    db.connect()
    db.initialize_tables()
    email_check = db.get_by_value('users', 'email', user["email"])
    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")

    request = f"""FROM films_to_users SELECT * WHERE email="{email_check}" and media_id={id}"""
    ftu = db.execute_with_request(request)
    print(ftu)

    return False



