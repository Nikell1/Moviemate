import unittest
import requests


class TestAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.auth_token = None

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

    def test2_del_film(self):
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
        self.assertEqual(response.status_code, 201)
        self.assertIn("success", response.json())

    def test3_search_film(self):
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

        query = "?search=смешарики"

        response = requests.get(self.api_url + "films/search_film" + query, headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertIn("total_results", response.json())

    def test4_get_films(self):
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

    def test5_get_rand_film(self):
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



if __name__ == '__main__':
    unittest.main()