from fastapi import APIRouter
from .get_movie_by_screenshot import router as get_movie_by_screenshot_router

router = APIRouter()


router.include_router(get_movie_by_screenshot_router)
