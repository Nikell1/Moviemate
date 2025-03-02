from fastapi import APIRouter, HTTPException, status, Header
from models.schemas import LogIn, Token
from adapters.db_source import DatabaseAdapter
import os
from dotenv import load_dotenv
router = APIRouter()
load_dotenv()

@router.post("/truncate", response_model=None, status_code=status.HTTP_204_NO_CONTENT)
async def truncate_all_tables(admin_key: str = Header(None)):
    adapter = DatabaseAdapter()
    if admin_key != os.getenv("ADMIN_KEY"):
        raise HTTPException(status_code=403, detail="Correct admin key required")
    adapter.connect()
    adapter.initialize_tables()
    for i in ['collections','users','collections','films','films_to_users','friends']:
        adapter.truncate_table(i)

