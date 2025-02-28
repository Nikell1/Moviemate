from pydantic import BaseModel

class LogIn(BaseModel):
    email: str
    hashed_password: str

