
# 1. Структура

## 0. Базовое взаимодействие

Сервер принимает запросы, а затем nginx рассортировывает запросы по серверам:
1. Запросы начинающиеся на  /api перенаправляются на порт 8000, где лежит контейнер с Backend частью.
2. Остальные запросы перенаправляются на контейнер с Frontend частью.
## 1. Backend

Наш backend начинает свою работы с подключения к Базе Данных и инициализации таблиц, а дальше, с помощью uvicorn, запускается FastAPI, который, как раз, обрабатывает запросы к базе данных.

## 2. Frontend 👍

Наш frontend написан с помощью JavaScripts, CSS, HTML и запущен при помощи Node.js.

## 3. СУБД
Ниже представлена ER-Диаграмма нашей СУБД, написанной при помощи PostgreSQL.
На ней показаны таблицы, использующие представленные имена, названия их столбцов и связь между определенными значениями столбцов.

![](https://gitlab.prodcontest.ru/team-24/films/-/raw/development/readme_data/erdb.png?ref_type=heads)

# 2. Взаимодействие сервисов

Когда пользователь заходит на сайт. его браузер делает запрос на Frontend сервис. Сервер отвечает браузеру информацией, которую ему надо отобразить на странице. Когда пользователь взаимодействует со странице, то браузер отправляет запрос на бэкенд, который после некоторого взаимодействия с СУБД, отправляет ответ frontend части, которая на основе ответа собирает страницу пользователю.

![](https://gitlab.prodcontest.ru/team-24/films/-/raw/development/readme_data/sergei.png)

# 3. CI/CD
https://gitlab.prodcontest.ru/team-24/films/-/blob/master/.gitlab-ci.yml?ref_type=head

# 4. Исходный код
https://gitlab.prodcontest.ru/team-24/films/-/blob/master

# 5. Спецификация

Сссылка на swagger - https://prod-team-24-jhaklm26.final.prodcontest.ru/api/docs перед использованием запросов необходимо авторизоватся в сваггере ( логин - admin, пароль - lVqTVwClGZDFoKXPGGdv )

# 6. Тесты

E2e тесты покрывают основную часть функционала апи, unit тесты покрывают методы адаптера субд и ещё есть коллекция в постмане, в которой описан основной сценарий использования эндпоинтов, где можно потыкать реквесты (тыкать нужно по порядку, так как в некоторых запросах есть зависимости от переменных, заданных в предыдущих запросах). В конце коллекции есть эндпоинт /api/service/truncate, который удаляет ВСЕ данные из субд. Его нужно прожимать только тогда, когда есть необходимость заново протестить эндпоинты и не получить 409. Чтобы использовать truncate, в заголовке под названием admin_key нужно указать ключ lVqTVwClGZDFoKXPGGdv . 
Ссылка на коллекцию - https://www.postman.com/team-24-prod/workspace/prod-postman-collection-test-scenario/collection/39570277-88045825-8a68-403b-9174-726371913176?action=share&creator=39570277