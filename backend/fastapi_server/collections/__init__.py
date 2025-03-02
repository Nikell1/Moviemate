from fastapi import APIRouter
from .collection import router as collection_router

router = APIRouter()
router.include_router(collection_router)

