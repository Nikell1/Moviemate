from datetime import datetime

import asyncio
import json
import os
import urllib.parse
from dotenv import load_dotenv
from fastapi import  HTTPException

from adapters import db_source
from models import TMDB
import httpx

from models.TMDB import TMDBobject_Genre

load_dotenv()
proxies = {
    "http://": "socks5://142.54.237.38:4145",
    "https://": "socks5://142.54.237.38:4145"
}

headers = {
    "accept": "application/json",
    "Authorization": "Bearer " + os.getenv("TMDB_KEY")
}

moods = {
    "Весёлое": [35, 10751, 10402, 10767],
    "Серьёзное": [18, 36, 10749, 99, 35],
    "Напряжённое": [28, 53, 27, 9648, 878, 18]
}

genres_ = {
        "28": 'Action',
        "12": 'Adventure',
        "16": 'Animatiomn',
        "35": 'Comedy',
        "80": 'Crime',
        "99": 'Documentary',
        "18": 'Drama',
        "10751": 'Family',
        "14": 'Fantasy',
        "36": 'History',
        "27": 'Horror',
        "10402": 'Music',
        "9648": 'Mystery',
        "10749": 'Romance',
        "878": 'Science Fiction',
        "10770": 'TV Movie',
        "53": 'Thriller',
        "10752": 'War',
        "37": 'Western',
        "10767": "Talk"
}

requests = httpx.Client(proxy="socks5://77.81.138.114:6000", headers=headers)

async def search_multi(query:str, genre_ids:list[int], release_date_low:str=None, release_date_high:str=None, include_adult:bool=False, watched:bool=None, email:str=None, language:str="ru-RU", page:int=1, limit=-1, short=True):
    encoded_query = urllib.parse.quote(query)
    url = f"https://api.themoviedb.org/3/search/multi?query={encoded_query}&include_adult={str(include_adult).lower()}&language={language}&page={page}"
    request = requests.get(url=url, headers=headers)
    response = json.loads(request.text)

    if limit >= response["total_results"] or limit == -1:
        limit = response["total_results"]
    
    new_results = []

    db = db_source.DatabaseAdapter()
    db.connect()
    db.initialize_tables()

    for i in range(limit):
        c_res = response["results"][i]

        if watched != None:
            name_l = "title"
            if "name" in c_res:
                name_l = "name"

            film_db = db.execute_with_request(f"""SELECT * FROM films_to_users WHERE media_id='{c_res["id"]}' and email='{email}'""")

            if film_db == [] and watched == True:
                continue

            elif film_db != [] and film_db[0]['watched'] != watched:
                continue

        try:

            if release_date_low != None:
                if "first_air_date" in c_res and c_res["first_air_date"] != '' and datetime.fromisoformat(release_date_low) > datetime.fromisoformat(
                        c_res["first_air_date"]):
                    continue
                if "release_date" in c_res and c_res["release_date"] != '' and datetime.fromisoformat(release_date_low) > datetime.fromisoformat(
                        c_res["release_date"]):
                    continue
            if release_date_high != None:
                if "first_air_date" in c_res and c_res["first_air_date"] != '' and datetime.fromisoformat(release_date_high) < datetime.fromisoformat(c_res["first_air_date"]):
                    continue
                if "release_date" in c_res and c_res["release_date"] != '' and datetime.fromisoformat(release_date_high) < datetime.fromisoformat(c_res["release_date"]):
                    continue
        except Exception as e:
            print(c_res)
            raise HTTPException(status_code=400, detail="incorrect date format")


        if "genres" not in c_res:
            c_res["genres"] = []

        if genre_ids != None:
            ok = False
            for id in c_res["genre_ids"]:
                if str(id) not in genres_:
                    continue
                if id in genre_ids:
                    ok = True
                name = genres_[str(id)]
                c_res["genres"].append(
                    TMDBobject_Genre(**{"id": id, "name": name})
                )

            if not ok:
                continue

        else:
            if "genre_ids" not in c_res:
                c_res["genre_ids"] = []
            for id in c_res["genre_ids"]:
                if str(id) not in genres_:
                    continue
                name = genres_[str(id)]
                c_res["genres"].append(
                    TMDBobject_Genre(**{"id": id, "name": name})
                )

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

def filter(film, release_date_low, release_date_high, genre_ids, watched, email):
    c_res = film

    if watched != None:
        name_l = "title"
        if "name" in c_res:
            name_l = "name"

        film_db = db.execute_with_request(
            f"""SELECT * FROM films_to_users WHERE media_id='{c_res["id"]}' and email='{email}'""")

        if film_db == [] and watched == True:
            return False

        elif film_db != [] and film_db[0]['watched'] != watched:
            return False

    try:

        if release_date_low != None:
            if "first_air_date" in c_res and c_res["first_air_date"] != '' and datetime.fromisoformat(
                    release_date_low) > datetime.fromisoformat(
                    c_res["first_air_date"]):
                return False
            if "release_date" in c_res and c_res["release_date"] != '' and datetime.fromisoformat(
                    release_date_low) > datetime.fromisoformat(
                    c_res["release_date"]):
                return False
        if release_date_high != None:
            if "first_air_date" in c_res and c_res["first_air_date"] != '' and datetime.fromisoformat(
                    release_date_high) < datetime.fromisoformat(c_res["first_air_date"]):
                return False
            if "release_date" in c_res and c_res["release_date"] != '' and datetime.fromisoformat(
                    release_date_high) < datetime.fromisoformat(c_res["release_date"]):
                return False
    except Exception as e:
        print(c_res)
        raise HTTPException(status_code=400, detail="incorrect date format")

    if "genres" not in c_res:
        c_res["genres"] = []

    if genre_ids != None:
        ok = False
        for id in c_res["genre_ids"]:
            if str(id) not in genres_:
                continue
            if id in genre_ids:
                ok = True
            name = genres_[str(id)]
            c_res["genres"].append(
                TMDBobject_Genre(**{"id": id, "name": name})
            )

        if not ok:
            return False

    else:
        if "genre_ids" not in c_res:
            c_res["genre_ids"] = []
        for id in c_res["genre_ids"]:
            if str(id) not in genres_:
                continue
            name = genres_[str(id)]
            c_res["genres"].append(
                TMDBobject_Genre(**{"id": id, "name": name})
            )
    return True

    # print(c_res)
    none_keys = []
    for param in c_res.keys():
        if c_res[param] == None:
            none_keys.append(param)
    for i in none_keys:
        del c_res[i]
