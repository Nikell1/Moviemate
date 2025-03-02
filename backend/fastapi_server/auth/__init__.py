from fastapi import APIRouter
from .login import router as login_router
from .register import router as register_router
from .logout import router as logout_router
from .check_token import router as check_token_router
from .change_login import router as change_login_router
router = APIRouter()


router.include_router(login_router)
router.include_router(register_router)
router.include_router(logout_router)
router.include_router(check_token_router)
router.include_router(change_login_router)