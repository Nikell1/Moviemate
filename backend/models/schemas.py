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
    poster_path:str
    overview:str
    release_date:str
    id:int
    watched:bool

class Add_media(BaseModel):
    media_id:str
    media_type:str = "movie"
    collection:str = None

class Set_collection(BaseModel):
    media_id:str
    collection:str = None