from fastapi import APIRouter
from .friends import router as friend
from .get_friends_films import router as friend_films
from .get_films_with_friends import router as get_films_with_friends


router = APIRouter()

router.include_router(friend)
router.include_router(friend_films)
router.include_router(get_films_with_friends)