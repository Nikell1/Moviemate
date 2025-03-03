import unittest
import httpx
import os
from dotenv import load_dotenv
load_dotenv()
class TestAPI(unittest.TestCase):
    def setUp(self):
        headers = {
            "accept": "application/json",
            "Authorization": "Bearer " + os.getenv("TMDB_KEY")
        }

        self.requests = httpx.Client(proxy="socks5://77.81.138.114:6000", headers=headers)

    def test1_ping_tmdb_server(self):
        url = "https://api.themoviedb.org/"
        response = self.requests.get(url, timeout=5)
        self.assertIn(response.status_code, [200, 301])

if __name__ == '__main__':
    unittest.main()