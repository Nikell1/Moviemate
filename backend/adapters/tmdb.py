import asyncio
import json
import urllib.parse
from models import TMDB
import httpx

proxies = {
    "http://": "socks5://77.81.138.114:6000",
    "https://": "socks5://77.81.138.114:6000"
}

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzc5YmVhZjI2ZWM2ZmM1NTU4ZDNkMWJjOGFhZGY4MSIsIm5iZiI6MTc0MDc2NDQ2Ny45OSwic3ViIjoiNjdjMWY1MzM3NmEzNjhmNzA2ZGJkMGM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.FHzVvtxp7cHYD3x3pX0qb-aCuoYe5ZCg_AJ85U1GXsQ"
}

requests = httpx.Client(proxy="socks5://77.81.138.114:6000", headers=headers)

async def search_multi(query:str, include_adult:bool=False, language:str="ru-RU", page:int=1, limit=-1):
    encoded_query = urllib.parse.quote(query)
    url = f"https://api.themoviedb.org/3/search/multi?query={encoded_query}&include_adult={str(include_adult).lower()}&language={language}&page={page}"
    request = requests.get(url=url, headers=headers)
    response = json.loads(request.text)

    if limit >= response["total_results"] or limit == -1:
        limit = response["total_results"]

    new_results = []

    for i in range(limit):
        c_res = response["results"][i]
        if c_res["media_type"] == "tv":
            new_results.append(TMDB.TMDBobject_TV(**c_res))
        elif c_res["media_type"] == "movie":
            new_results.append(TMDB.TMDBobject_Movie(**c_res))
        else:
            pass

    response["results"] = new_results

    return response

async def search_multi_short(query:str, include_adult:bool=False, language:str="ru-RU", page:int=1, limit=-1):
    encoded_query = urllib.parse.quote(query)
    url = f"https://api.themoviedb.org/3/search/multi?query={encoded_query}&include_adult={str(include_adult).lower()}&language={language}&page={page}"
    request = requests.get(url=url, headers=headers)
    response = json.loads(request.text)

    if limit >= response["total_results"] or limit == -1:
        limit = response["total_results"]

    new_results = []

    for i in range(limit):
        c_res = response["results"][i]
        cooked = {}

        if c_res["media_type"] == "tv":
            cooked = {
                "title": c_res["name"],
                "poster_path": c_res["poster_path"],
                "overview": c_res["overview"],
                "release_date": c_res["first_air_date"],
                "id": c_res["id"],
                "media_type": "tv"
            }
            new_results.append(TMDB.TMDBobject_Short(**cooked))

        elif c_res["media_type"] == "movie":
            cooked = {
                "title": c_res["title"],
                "poster_path": c_res["poster_path"],
                "overview": c_res["overview"],
                "release_date": c_res["release_date"],
                "id": c_res["id"],
                "media_type": "movie"
            }
            new_results.append(TMDB.TMDBobject_Short(**cooked))
        else:
            pass

    response["results"] = new_results

    return response

async def get_tv_by_id(id:int):
    url = f"https://api.themoviedb.org/3/tv/{id}?language=ru-RU"
    request = requests.get(url=url, headers=headers)
    response = json.loads(request.text)
    return response

async def get_movie_by_id(id:int):
    url = f"https://api.themoviedb.org/3/movie/{id}?language=ru-RU"
    request = requests.get(url=url, headers=headers)
    response = json.loads(request.text)
    return response

async def get_by_id(id:int):
    tv = await get_tv_by_id(id)
    movie = await get_movie_by_id(id)

    print(tv, movie)

