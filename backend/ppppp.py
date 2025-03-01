from adapters import tmdb
import asyncio
print(asyncio.run(tmdb.search_multi_short("чбд")))