from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi_server.auth import router as authorization_router
from fastapi_server.images import router as images_router
from fastapi_server.screenshots import router as screenshots_router
import os
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить все источники
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authorization_router, prefix="/auth", tags=["Auth"])
app.include_router(images_router, prefix="/images", tags=["Images"])
app.include_router(screenshots_router, prefix="/screenshots", tags=["Screenshots"])


@app.get("/api/user/tmdb/")
async def get_short_film():
    return "Penis valeriy"


if __name__ == "__main__":
    
    host, port = 'localhost', '8000'
    uvicorn.run(app, host=host, port=int(port))
