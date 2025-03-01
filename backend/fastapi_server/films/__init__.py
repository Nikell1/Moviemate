from fastapi import APIRouter
from .add_media import router as add_media_router
from .search import router as search_router
from .get_media_by_user import router as get_media_by_user_router


router = APIRouter()


router.include_router(add_media_router)
router.include_router(search_router)
router.include_router(get_media_by_user_router)
