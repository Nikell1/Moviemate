from fastapi import APIRouter
from .truncate_base import router as truncate_base_router

router = APIRouter()


router.include_router(truncate_base_router)
