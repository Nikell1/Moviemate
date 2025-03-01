import smtplib
from dotenv import load_dotenv
import os

load_dotenv()

smtp_server = "smtp.yandex.ru"
port = 587
username = os.getenv("MAIL_LOGIN")
password = os.getenv("MAIL_PASSWORD")

server = smtplib.SMTP(smtp_server, port)
server.starttls()

async def send_invite(to_email:str, from_login:str):
    try:
        server.login(username, password)
        from_email = "pr0dfilm@yandex.ru"
        to_email = to_email
        subject = "Новое приглашение в друзья"
        message = f"Subject: {subject}\n\nНовое приглашение в друзья от {from_login}"
        server.sendmail(from_email, to_email, message.encode('utf-8'))
        server.quit()
    except Exception as e:
        print(e)