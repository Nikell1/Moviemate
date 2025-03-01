from supabase import create_client, Client
from fastapi import APIRouter, File, UploadFile

# Инициализация FastAPI
router = APIRouter()

# Укажите URL и ключ вашего проекта Supabase

# Создание клиента Supabase

@router.post("/upload/")
async def upload_profile_image(file: UploadFile = File(...)):
    SUPABASE_URL = "https://rtgzvwygihgmswknfqoi.supabase.co"
    SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0Z3p2d3lnaWhnbXN3a25mcW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MTI2ODAsImV4cCI6MjA1NjM4ODY4MH0.IpGmWIq03G57WFk2z-bJWLv9yK4GrhbLbB29jpOndpg"
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    # Чтение содержимого файла
    file_content = await file.read()
    
    # Укажите имя bucket и путь для сохранения файла
    bucket_name = "images"
    file_path = f"profile_images/{file.filename}"
    
    # Загрузка файла в хранилище Supabase
    upload_response = supabase.storage.from_(bucket_name).upload(file_path, file_content)
    
    # Проверка успешности загрузки
    if upload_response.get("error"):
        return {"error": upload_response["error"]["message"]}
    
    # Получение публичного URL файла
    public_url_response = supabase.storage.from_(bucket_name).get_public_url(file_path)
    return {"message": "Файл успешно загружен!", "url": public_url_response}

