import asyncio
import json
import os
import urllib.parse
from dotenv import load_dotenv
from fastapi import  HTTPException
from models import TMDB
import httpx

load_dotenv()
proxies = {
    "http://": "socks5://77.81.138.114:6000",
    "https://": "socks5://77.81.138.114:6000",
}

headers = {
    "accept": "application/json",
    "Authorization": "Bearer " + os.getenv("TMDB_KEY")
}

moods = {
    "Весёлое": [35, 12, 10751, 10402],
    "Серьёзное": [18, 36, 10749, 99, 35],
    "Напряжённое": [28, 53, 27, 9648, 878, 18]
}


requests = httpx.Client(proxy="socks5://77.81.138.114:6000", headers=headers)

async def search_multi(query:str, include_adult:bool=False, language:str="ru-RU", page:int=1, limit=-1, short=True):
    encoded_query = urllib.parse.quote(query)
    url = f"https://api.themoviedb.org/3/search/multi?query={encoded_query}&include_adult={str(include_adult).lower()}&language={language}&page={page}"
    request = requests.get(url=url, headers=headers)
    response = json.loads(request.text)

    if limit >= response["total_results"] or limit == -1:
        limit = response["total_results"]
    
    new_results = []
    for i in range(limit):
        c_res = response["results"][i]
        # print(c_res)
        none_keys = []
        for param in c_res.keys():
            if c_res[param] == None:
                none_keys.append(param)
        for i in none_keys:
            del c_res[i]
        # print(c_res)
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
            if c_res["media_type"] == "tv":
                new_results.append(TMDB.TMDBobject_TV(**c_res))
            elif c_res["media_type"] == "movie":
                new_results.append(TMDB.TMDBobject_Movie(**c_res))
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

async def get_by_id(id:int, media_type:str="movie", short:bool=True):
    if media_type == "tv":
        found = await get_tv_by_id(id)
        if "name" in found:
            found['title'] = found['name']
        if "first_air_date" in found:
            found['release_date'] = found['first_air_date']
    elif media_type == "movie":
        found = await get_movie_by_id(id)

    else:
        raise HTTPException(status_code=404, detail="incorrect media_type")

    if "success" in found and found["success"] == False:
        raise HTTPException(status_code=404, detail="Media Not Fount 404")
        

    found["media_type"] = media_type

    print(found)
    if short:
        found = TMDB.TMDBobject_Short(**found)
    else:
        if media_type == "movie":
            found = TMDB.TMDBobject_Movie(**found)
        elif media_type == "tv":
            found = TMDB.TMDBobject_TV(**found)

    return found

async def get_moods_by_genres(genre_ids):
    suitable_moods = set()

    genre_ids_set = {genre.model_dump()['id'] for genre in genre_ids}

    for mood, ids in moods.items():
        if any(genre_id in ids for genre_id in genre_ids_set):
            suitable_moods.add(mood)

    return list(suitable_moods)

