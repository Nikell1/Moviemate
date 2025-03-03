import unittest
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from adapters.db_source import DatabaseAdapter

class CRUD_DB_tests(unittest.TestCase):
    def test1_create(self):
        db = DatabaseAdapter()
        self.user_info = {"email": "user@example.com", "login": "tuser", "password": "tpassword", "token": "ttoken", "profile_image": 123}
        db.connect()
        db.truncate_table("users")

        db.insert('users', self.user_info)

    def test2_read(self):
        db = DatabaseAdapter()
        self.user_info = {"email": "user@example.com", "login": "tuser", "password": "tpassword", "token": "ttoken", "profile_image": 123}
        db.connect()
        user = db.get_by_value('users', 'email', self.user_info['email'])[0]
        self.assertEqual(user['email'], self.user_info['email'])
        self.assertEqual(user['login'], self.user_info['login'])
        self.assertEqual(user['password'], self.user_info['password'])
        self.assertEqual(user['token'], self.user_info['token'])
        self.assertEqual(user['profile_image'], self.user_info['profile_image'])

    def test3_update(self):
        db = DatabaseAdapter()
        self.user_info = {"email": "user@example.com2", "login": "tuser2", "password": "tpassword2", "token": "ttoken2", "profile_image": 123}
        db.connect()
        db.update_by_value('users', self.user_info, 'email', 'user@example.com')
        user = db.get_by_value('users', 'email', self.user_info['email'])[0]
        self.assertEqual(user['email'], self.user_info['email'])
        self.assertEqual(user['login'], self.user_info['login'])
        self.assertEqual(user['password'], self.user_info['password'])
        self.assertEqual(user['token'], self.user_info['token'])
        self.assertEqual(user['profile_image'], self.user_info['profile_image'])

    def test4_delete(self):
        db = DatabaseAdapter()
        self.user_info = {"email": "user@example.com2", "login": "tuser2", "password": "tpassword2", "token": "ttoken2", "profile_image": 123}
        db.connect()
        db.delete_by_value('users', 'email', self.user_info['email'])
        user = db.get_by_value('users', 'email', self.user_info['email'])
        self.assertEqual(len(user), 0)

if __name__ == '__main__':
    unittest.main()