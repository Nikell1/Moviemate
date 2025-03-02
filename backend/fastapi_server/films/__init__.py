from fastapi import APIRouter
from .media import router as add_media_router
from .search import router as search_router
from .get_media_by_user import router as get_media_by_user_router
from .mark_as_watched import router as mark_as_watched_router
from ..titles.title import router as title_router
from .create_media import router as create_media_router
from .set_collection import router as set_collection_router
router = APIRouter()


router.include_router(add_media_router)
router.include_router(search_router)
router.include_router(get_media_by_user_router)
router.include_router(mark_as_watched_router)
router.include_router(title_router)
router.include_router(create_media_router)
router.include_router(set_collection_router)
