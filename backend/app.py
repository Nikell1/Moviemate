from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi_server.auth import router as authorization_router
from fastapi_server.screenshots import router as screenshots_router
from fastapi_server.films import router as films_router
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить все источники
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authorization_router, prefix="/api/auth", tags=["Auth"])
app.include_router(screenshots_router, prefix="/api/screenshots", tags=["Screenshots"])
app.include_router(films_router, prefix="/api/films", tags=["Films"])
if __name__ == "__main__":
    host, port = 'localhost', '8000'
    uvicorn.run(app, host=host, port=int(port))
