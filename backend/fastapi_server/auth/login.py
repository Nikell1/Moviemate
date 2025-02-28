from fastapi import APIRouter, HTTPException, status
from models.schemas import LogIn
from adapters.db_source import DatabaseAdapter
import json
router = APIRouter()


@router.post("/auth/login", response_model=None, status_code=status.HTTP_200_OK)
async def ad_click(body: LogIn):
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    return {}
    