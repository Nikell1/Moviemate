from fastapi import APIRouter
from .friends import router as friend


router = APIRouter()

router.include_router(friend)
