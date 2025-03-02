from fastapi import APIRouter, HTTPException, status
from models.schemas import LogIn, Token
from adapters.db_source import DatabaseAdapter
import bcrypt
from utils.functions import create_access_token
import json

router = APIRouter()


@router.post("/truncate", response_model=None, status_code=status.HTTP_204_NO_CONTENT)
async def truncate_all_tables():
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()


    for i in ['collections']:

        adapter.truncate_table(i)

