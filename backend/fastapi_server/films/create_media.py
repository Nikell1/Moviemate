from fastapi import APIRouter, HTTPException, status,Security
from models.schemas import Film
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
router = APIRouter()
Bear = HTTPBearer(auto_error=False)


@router.post("/create_film", status_code=status.HTTP_201_CREATED)
async def create_media(body: Film,token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()

    films = adapter.get_by_value('films', 'title', body.title)
    if len(films) != 0:
        raise HTTPException(status_code=409, detail="Media with this title already exist")
    adapter.insert('films', body.model_dump())
    films = adapter.get_by_value('films', 'title', body.title)[0]
    film_id = -1 * films["id"]
    adapter.insert('films_to_users', {
        'email': user["email"],
        'media_id':  film_id,
        "collection": None,
        "media_type": "movie"
    })
    return {"media_id": film_id}

