FROM python:3.12-alpine3.21

COPY ./backend/requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "./app.py" ]