from pydantic import BaseModel

class LogIn(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    token: str

class Register(BaseModel):
    email: str
    password: str
    login: str

class Film(BaseModel):
    name: str
    description: str
    year: int

class Film_to_front(BaseModel):
    title:str
    poster_path:str
    overview:str
    release_date:str
    id:int
    media_type:str