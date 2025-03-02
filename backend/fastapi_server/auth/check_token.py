from fastapi import APIRouter, HTTPException, status,Security
from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user
router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.get("/check-token", status_code=status.HTTP_200_OK)
async def add_media(token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    user = user[0]
    adapter = DatabaseAdapter()
    adapter.connect()
    adapter.initialize_tables()
    email_check = adapter.get_by_value('users', 'email', user["email"])
    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")
    
    return email_check[0]