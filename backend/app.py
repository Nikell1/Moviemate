from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi_server.auth import router as authorization_router
from fastapi_server.screenshots import router as screenshots_router
from fastapi_server.films import router as films_router
from fastapi_server.social import router as social_router
from fastapi_server.collections import  router as collection_router
from fastapi_server.service import router as service_router
import os
load_dotenv()
app = FastAPI(docs_url="/api/docs",openapi_url="/api/openapi.json")

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
app.include_router(collection_router, prefix="/api/collections", tags=["Collections"])
app.include_router(social_router, prefix="/api/social", tags=["Social"])
app.include_router(service_router, prefix="/api/service", tags=["Service"])


if __name__ == "__main__":
    host, port = os.getenv("FAST_API_HOST"), os.getenv("FAST_API_PORT")
    uvicorn.run(app, host=host, port=int(port))
    