
from pydantic import BaseModel

class TMDBobject_Genre(BaseModel):
    id:int = 0
    name:str

class TMDBobject_TV(BaseModel):
    adult:bool = True
    genres:list[TMDBobject_Genre] = []
    id: int = 0
    name:str
    original_name:str
    original_language:str
    overview:str
    popularity:float = 0.0
    poster_path:str = None
    first_air_date:str
    video:bool = True
    vote_average:float = 0.0
    vote_count:int = 0.0
    media_type:str

class TMDBobject_Movie(BaseModel):
    adult:bool = True
    genres:list[TMDBobject_Genre] = []
    id: int = 0
    title:str
    original_title:str
    original_language:str
    overview:str
    popularity:float = 0.0
    poster_path:str = None
    release_date:str
    video:bool = True
    vote_average:float = 0.0
    vote_count:int = 0.0
    media_type:str

class TMDBobject_Short(BaseModel):
    title:str
    poster_path:str = None
    overview:str = None
    release_date:str = None
    id:int = None
    media_type:str = None

