import unittest
import requests

class TestAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.auth_token = None

    def setUp(self):
        self.api_url = "http://localhost:8000/api/auth/"
    
    def test1_register(self):
        data = {
            "email": "test@test.com",
            "password": "test123",
            "login": "test"
        }
        response = requests.post(self.api_url + "register", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        TestAPI.auth_token = response.json()["token"]

    def test2_login(self):
        data = {
            "email": "test@test.com",
            "password": "test123"
        }
        response = requests.post(self.api_url + "login", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json()) 
        TestAPI.auth_token = response.json()["token"]

    def test3_logout(self):
        data = {
            "token": f"{TestAPI.auth_token}"
        }
        response = requests.post(self.api_url + "logout", json=data)
        self.assertEqual(response.status_code, 204)

if __name__ == '__main__':
    unittest.main()