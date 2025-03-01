import asyncio
from adapters import tmdb


sigma = asyncio.run(tmdb.get_by_id(2, short=False))
print(sigma)


