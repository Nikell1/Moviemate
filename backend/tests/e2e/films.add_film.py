import unittest
import requests


class TestAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.auth_token = None

    def setUp(self):
        self.api_url = "http://localhost:8000/api/"

    def test1_register(self):
        data = {
            "email": "test@test.com",
            "password": "test123",
            "login": "test"
        }
        response = requests.post(self.api_url + "auth/register", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        TestAPI.auth_token = response.json()["token"]

    def test2_login(self):
        data = {
            "email": "test@test.com",
            "password": "test123"
        }
        response = requests.post(self.api_url + "auth/login", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        TestAPI.auth_token = response.json()["token"]

    def test3_add_film(self):
        headers = {
            "accept": "Application/json",
            "Authorization": f"{TestAPI.auth_token}"
        }
        data = {
            "media_id": 2,
            "media_type": "movie"
        }

        response = requests.post(self.api_url + "films/film", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        TestAPI.auth_token = response.json()["token"]

    def test4_logout(self):
        data = {
            "token": f"{TestAPI.auth_token}"
        }
        response = requests.post(self.api_url + "logout", json=data)
        self.assertEqual(response.status_code, 204)


if __name__ == '__main__':
    unittest.main()