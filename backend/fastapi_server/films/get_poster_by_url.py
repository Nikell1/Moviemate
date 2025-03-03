from fastapi import APIRouter, HTTPException, status
from fastapi.responses import Response
from dotenv import load_dotenv
import httpx
from io import BytesIO
import os
import asyncio

router = APIRouter()
load_dotenv()

async def fetch_with_retry(client: httpx.AsyncClient, url: str, headers: dict, max_retries: int = 3) -> bytes:
    for attempt in range(max_retries):
        try:
            response = await client.get(url, headers=headers)
            response.raise_for_status()
            return response.content
        except (httpx.TimeoutException, httpx.HTTPError) as e:
            if attempt == max_retries - 1:
                raise
            await asyncio.sleep(1 * (attempt + 1))  # Exponential backoff

@router.get("/get-poster-by-url", status_code=status.HTTP_200_OK)
async def get_poster(url: str):
    if len(url) < 10:
        raise HTTPException(status_code=400, detail="URL too short")
    if not url.endswith('jpg'):
        raise HTTPException(status_code=400, detail="Invalid image format")

    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {os.getenv('TMDB_KEY')}",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }

    # Configure client with increased timeouts
    timeout = httpx.Timeout(30.0, connect=10.0)
    limits = httpx.Limits(max_keepalive_connections=5, max_connections=10)

    try:
        async with httpx.AsyncClient(
            proxy="http://user166198:dsolnu@154.16.68.39:5030",
            timeout=timeout,
            limits=limits,
            verify=False,
            follow_redirects=True
        ) as client:
            image_content = await fetch_with_retry(
                client,
                f'https://image.tmdb.org/t/p/w200{url}',
                headers
            )
            return Response(
                content=BytesIO(image_content).getvalue(),
                media_type="image/jpeg",
                headers={
                    "Cache-Control": "public, max-age=31536000",
                    "Connection": "keep-alive"
                }
            )

    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="Request timed out after multiple retries"
        )
    except httpx.HTTPError as e:
        raise HTTPException(
            status_code=503,
            detail=f"HTTP error occurred: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal error: {str(e)}"
        )