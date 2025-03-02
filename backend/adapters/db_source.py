import os
import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import RealDictCursor
from typing import List, Any

load_dotenv()

class DatabaseAdapter:
    def __init__(self) -> None:
        self.connection = None

    def connect(self) -> None:
        try:
            self.connection = psycopg2.connect(
                dbname="postgres",
                user="postgres",
                password=os.getenv("DB_PASSWORD"),
                host=os.getenv("DB_HOST"),
                port=os.getenv("DB_PORT")
            )
            print("Соединение с базой данных установлено.")
        except psycopg2.Error as e:
            print(f"Ошибка подключения к базе данных: {e}")
            raise
    def initialize_tables(self) -> None:
        table_definitions = {
            "users": """
                CREATE TABLE IF NOT EXISTS users (
                    email VARCHAR(200) UNIQUE NOT NULL,
                    login VARCHAR(100) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    token VARCHAR(255),
                    profile_image INT
                );
            """,
            "films": """
                CREATE TABLE IF NOT EXISTS films (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(200) UNIQUE NOT NULL,
                    description VARCHAR(500) UNIQUE,
                    date VARCHAR(200),
                    image_url VARCHAR(200)
                );
            """,
            "films_to_users": """
                CREATE TABLE IF NOT EXISTS films_to_users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(200) NOT NULL,
                    media_id INTEGER NOT NULL,
                    collection VARCHAR(200),
                    media_type VARCHAR(200),
                    watched BOOLEAN DEFAULT False,
                    moods text[] COLLATE pg_catalog."default"
                );
            """,
            "collections": """
                CREATE TABLE IF NOT EXISTS collections (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(200) NOT NULL,
                    collection_name VARCHAR(200)
                );
            """,
            "friends": """
                CREATE TABLE IF NOT EXISTS friends (
                    user1 VARCHAR(200) NOT NULL,
                    user2 VARCHAR(200) NOT NULL,
                    status VARCHAR(200)
                );
            """
        }

        with self.connection.cursor() as cursor:
            for table_name, create_query in table_definitions.items():
                cursor.execute(create_query)
                print(f"Таблица '{table_name}' проверена или создана.")
            self.connection.commit()
    def get_all(self, table_name: str) -> List[dict]:
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(f"SELECT * FROM {table_name};")
            return cursor.fetchall()

    def get_by_id(self, table_name: str, id: str | int) -> List[dict]:
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(f"SELECT * FROM {table_name} WHERE id = %s;", (id,))
            return cursor.fetchall()

    def get_by_value(
        self,
        table_name: str,
        parameter: str,
        parameter_value: Any,
    ) -> List[dict]:
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            query = f"SELECT * FROM {table_name} WHERE {parameter} = %s;"
            cursor.execute(query, (parameter_value,))
            return cursor.fetchall()

    def insert(self, table_name: str, insert_dict: dict) -> List[dict]:
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            columns = ', '.join(insert_dict.keys())
            values = ', '.join(['%s'] * len(insert_dict))
            query = f"INSERT INTO {table_name} ({columns}) VALUES ({values}) RETURNING *;"
            cursor.execute(query, tuple(insert_dict.values()))
            self.connection.commit()
            return cursor.fetchall()

    def update(self, table_name: str, update_dict: dict, id: int) -> List[dict]:
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            set_clause = ', '.join([f"{key} = %s" for key in update_dict.keys()])
            query = f"UPDATE {table_name} SET {set_clause} WHERE id = %s RETURNING *;"
            cursor.execute(query, tuple(update_dict.values()) + (id,))
            self.connection.commit()
            return cursor.fetchall()

    def delete(self, table_name: str, id: int) -> List[dict]:
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            query = f"DELETE FROM {table_name} WHERE id = %s RETURNING *;"
            cursor.execute(query, (id,))
            self.connection.commit()
            return cursor.fetchall()

    def execute_with_request(self, request):
        with self.connection.cursor() as cursor:
                cursor.execute(request)
                self.connection.commit()
                if cursor.description:
                    rows = cursor.fetchall()
                    column_names = [desc[0] for desc in cursor.description]
                    return [dict(zip(column_names, row)) for row in rows]
                return None

    def delete_by_value(
        self,
        table_name: str,
        parameter: str,
        parameter_value: Any,
    ) -> List[dict]:
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            query = f"DELETE FROM {table_name} WHERE {parameter} = %s RETURNING *;"
            cursor.execute(query, (parameter_value,))
            self.connection.commit()
            return cursor.fetchall()
        
    def update_by_value(
        self,
        table_name: str,
        update_dict: dict,
        parameter: Any,
        value: Any
    ) -> List[dict]:
        with self.connection.cursor(cursor_factory=RealDictCursor) as cursor:
            set_clause = ', '.join([f"{key} = %s" for key in update_dict.keys()])
            query = f"UPDATE {table_name} SET {set_clause} WHERE {parameter} = %s RETURNING *;"
            cursor.execute(query, tuple(update_dict.values()) + (value,))
            self.connection.commit()
    
    def truncate_table(self, table_name: str) -> None:
        with self.connection.cursor() as cursor:
            cursor.execute(f"TRUNCATE TABLE {table_name};")
            self.connection.commit()