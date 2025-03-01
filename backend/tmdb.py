import requests
import asyncio
import json
import urllib.parse
from models import schemas

API_KEY ="47f44a43e300fb87ed23a98e0209f1ba"
headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzc5YmVhZjI2ZWM2ZmM1NTU4ZDNkMWJjOGFhZGY4MSIsIm5iZiI6MTc0MDc2NDQ2Ny45OSwic3ViIjoiNjdjMWY1MzM3NmEzNjhmNzA2ZGJkMGM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.FHzVvtxp7cHYD3x3pX0qb-aCuoYe5ZCg_AJ85U1GXsQ"
}



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
            new_results.append(schemas.TMDBobject_TV(**c_res))
        elif c_res["media_type"] == "movie":
            new_results.append(schemas.TMDBobject_Movie(**c_res))
        else:
            pass

    response["results"] = new_results

    return response


sigma = asyncio.run(search_multi("чбд"))
print(sigma)


