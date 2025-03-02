from fastapi import APIRouter
from .friends import router as friend
from .get_friends_films import router as friend_films


router = APIRouter()

router.include_router(friend)
router.include_router(friend_films)