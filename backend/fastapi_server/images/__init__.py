from fastapi import APIRouter
from .upload_profile_image import router as upload_profile_image_router



router = APIRouter()



router.include_router(upload_profile_image_router)
