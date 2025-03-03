from datetime import datetime, timedelta
from adapters.db_source import DatabaseAdapter
import jwt
import os
from dotenv import load_dotenv
load_dotenv()
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, os.getenv('RANDOM_SECRET','aslfkhjalksdfbrenrtbvenbte'), algorithm="HS256")
    return encoded_jwt

def get_user(token: str):
    adapter = DatabaseAdapter()
    adapter.connect()

    user = adapter.get_by_value('users', 'token', token)
    return user