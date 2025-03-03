from fastapi import APIRouter
from .ai import router as ai

router = APIRouter()


router.include_router(ai)
