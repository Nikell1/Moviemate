from datetime import datetime

from pycparser.c_ast import Struct
from pydantic import BaseModel

class LogIn(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    token: str

class LogInResponse(BaseModel):
    token: str
    login: str

class Register(BaseModel):
    email: str
    password: str
    login: str

class Film(BaseModel):
    title: str
    description: str
    date: str
    image_url:str

class Film_to_front(BaseModel):
    title:str
    poster_path:str = None
    overview:str = None
    release_date:str = None
    id:int
    watched:bool = False
class Add_media(BaseModel):
    media_id:int
    media_type:str = "movie"
    collection:str = None

class Search(BaseModel):
    release_date_low: str = None
    release_date_high: str = None
    genre_ids: list[int] = None
    watched: bool = None

class Set_collection(BaseModel):
    media_id:str
    collection:str = None

class Friend(BaseModel):
    login:str