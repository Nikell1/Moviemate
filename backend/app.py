from fastapi import FastAPI, Request
import uvicorn
from fastapi_server.auth import router as authorization_router
from fastapi_server.images import router as images_router
import os
app = FastAPI()


app.include_router(authorization_router, prefix="/auth", tags=["Auth"])
app.include_router(images_router, prefix="/images", tags=["Images"])

if __name__ == "__main__":
    
    host, port = 'localhost', '8000'
    uvicorn.run(app, host=host, port=int(port))
