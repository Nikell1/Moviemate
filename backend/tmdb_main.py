import asyncio
from adapters import tmdb


sigma = asyncio.run(tmdb.get_by_id(1))
print(sigma)


