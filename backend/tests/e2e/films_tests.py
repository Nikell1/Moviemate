import unittest
import requests
from netaddr.ip.iana import query

from adapters import db_source

class TestAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.auth_token = None
        db = db_source.DatabaseAdapter()
        db.connect()
        db.truncate_table('films_to_users')
        db.truncate_table('users')
        db.truncate_table('films')
        db.truncate_table('collections')
        db.initialize_tables()

    def setUp(self):
        self.api_url = "http://localhost:8000/api/"

    def test1_add_film(self):
        data = {
            "email": "test@test.com",
            "password": "test123",
            "login": "test"
        }
        response = requests.post(self.api_url + "auth/register", json=data)
        print(response.text)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        TestAPI.auth_token = response.json()["token"]

        headers = {
            "accept": "Application/json",
            "Authorization": f"Bearer {TestAPI.auth_token}"
        }

        data = {
            "media_id": 2,
            "media_type": "movie"
        }

        response = requests.post(self.api_url + "films/film", json=data, headers=headers)
        self.assertEqual(response.status_code, 201)
        self.assertIn("success", response.json())


    def test2_search_film(self):
        data = {
            "email": "test@test.com",
            "password": "test123"
        }

        response = requests.post(self.api_url + "auth/login", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        TestAPI.auth_token = response.json()["token"]

        headers = {
            "accept": "Application/json",
            "Authorization": f"Bearer {TestAPI.auth_token}"
        }

        data = {
            "release_date_low": "1999-12-07",
            "release_date_high": "2050-01-01",
            "genres": [18, 53]
        }

        query = "?search=елейный слоник"

        response = requests.post(self.api_url + "films/search_film" + query, json=data, headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertIn("total_results", response.json())

    def test3_get_films(self):
        data = {
            "email": "test@test.com",
            "password": "test123"
        }

        response = requests.post(self.api_url + "auth/login", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        TestAPI.auth_token = response.json()["token"]

        headers = {
            "accept": "Application/json",
            "Authorization": f"Bearer {TestAPI.auth_token}"
        }

        response = requests.get(self.api_url + "films/get_films", headers=headers)
        self.assertEqual(response.status_code, 200)

    def test4_get_rand_film(self):
        data = {
            "email": "test@test.com",
            "password": "test123"
        }

        response = requests.post(self.api_url + "auth/login", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        TestAPI.auth_token = response.json()["token"]

        headers = {
            "accept": "Application/json",
            "Authorization": f"Bearer {TestAPI.auth_token}"
        }

        response = requests.get(self.api_url + "films/get_rand_film", headers=headers)
        self.assertEqual(response.status_code, 200)

    def test5_mark_as_watched(self):
        data = {
            "email": "test@test.com",
            "password": "test123"
        }

        response = requests.post(self.api_url + "auth/login", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        TestAPI.auth_token = response.json()["token"]

        headers = {
            "accept": "Application/json",
            "Authorization": f"Bearer {TestAPI.auth_token}"
        }

        query = '?id=2'


        response = requests.put(self.api_url + "films/mark_as_watched" + query, headers=headers)
        self.assertEqual(response.status_code, 200)


    def test6_del_film(self):
        data = {
            "email": "test@test.com",
            "password": "test123"
        }
        response = requests.post(self.api_url + "auth/login", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        TestAPI.auth_token = response.json()["token"]

        headers = {
            "accept": "Application/json",
            "Authorization": f"Bearer {TestAPI.auth_token}"
        }

        query = "?media_id=2"

        response = requests.delete(self.api_url + "films/film" + query, headers=headers)
        self.assertEqual(response.status_code, 204)
        self.assertIn("success", response.json())

    def test7_create_film(self):
        data = {
            "email": "test@test.com",
            "password": "test123"
        }
        response = requests.post(self.api_url + "auth/login", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        TestAPI.auth_token = response.json()["token"]

        headers = {
            "accept": "Application/json",
            "Authorization": f"Bearer {TestAPI.auth_token}"
        }

        data = {
            "title": "Зеленый слоник 2",
            "description": "Шкильник",
            "date": "2025-03-05",
            "image_url": "netu"
        }

        response = requests.post(self.api_url + "films/create_film", headers=headers, json=data)
        self.assertEqual(response.status_code, 201)
        self.assertIn("media_id", response.json())

    def test8_add_film_collection(self):
        data = {
            "email": "test@test.com",
            "password": "test123"
        }
        response = requests.post(self.api_url + "auth/login", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        TestAPI.auth_token = response.json()["token"]

        headers = {
            "accept": "Application/json",
            "Authorization": f"Bearer {TestAPI.auth_token}"
        }

        data = {
            "name": "skibidi"
        }

        response = requests.post(self.api_url + "collections/collections", headers=headers, json=data)
        self.assertEqual(response.status_code, 201)
        self.assertIn("media_id", response.json())

        headers = {
            "accept": "Application/json",
            "Authorization": f"Bearer {TestAPI.auth_token}"
        }

        data = {
            "media_id": 2,
            "collection": "skibidi"
        }

        response = requests.post(self.api_url + "collections/collections", headers=headers, json=data)
        self.assertEqual(response.status_code, 201)


if __name__ == '__main__':
    unittest.main()