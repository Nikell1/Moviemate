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


if __name__ == '__main__':
    unittest.main()