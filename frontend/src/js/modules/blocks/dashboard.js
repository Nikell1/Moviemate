import { renderMoviehHtml } from "../html/dashboardHtml.js";
import * as consts from "../consts.js"
import { transition } from "../functions.js"
export function renderMoviesList() {
    
}

export function renderDashboard() {
    try{
        let token = localStorage.getItem("token")
    } catch (error) {
        console.log(error)
        transition(consts.homeHash)
    }
    const url = 'http://localhost:8000/api/films/get_films'; // Замените на ваш URL FastAPI сервера

    const requestBody = {
        email: email,
        password: password,
        login: login
    };

    try {
        const response = fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                "Content-Type": "application/json" // Указываем тип содержимого
            }
        });
        
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        
        const data = response.json();
        console.log(data)

    } catch (error) {
        console.error('Ошибка при авторизации пользователя:', error);
    }
}
