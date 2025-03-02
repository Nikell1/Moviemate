from fastapi import APIRouter
from .title import router as title_router

router = APIRouter()
router.include_router(title_router)

