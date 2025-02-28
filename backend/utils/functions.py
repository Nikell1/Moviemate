from datetime import datetime, timedelta
import jwt
import os
import re
import json

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, os.getenv('RANDOM_SECRET', 'aslfkhjalksdfbrenrtbvenbte'), algorithm="HS256")
    return encoded_jwt
