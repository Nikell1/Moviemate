import requests
import time

start = time.time()

url = "https://api.themoviedb.org/3/search/multi?query=%D1%87%D0%B1%D0%B4&include_adult=false&language=ru-RU&page=1"

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzc5YmVhZjI2ZWM2ZmM1NTU4ZDNkMWJjOGFhZGY4MSIsIm5iZiI6MTc0MDc2NDQ2Ny45OSwic3ViIjoiNjdjMWY1MzM3NmEzNjhmNzA2ZGJkMGM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.FHzVvtxp7cHYD3x3pX0qb-aCuoYe5ZCg_AJ85U1GXsQ"
}

response = requests.get(url, headers=headers)
ans = time.time() - start
print(response.text)
print(ans)