import { renderMoviehHtml } from "../html/dashboardHtml.js";
import * as consts from "../consts.js"
import { transition } from "../functions.js"
export function renderMoviesList() {
    
}

export function renderDashboard() {
    let token = ''
    try{
        token = localStorage.getItem("token")
    } catch (error) {
        console.log(error)
        transition(consts.homeHash)
    }
    const url = 'http://localhost:8000/api/films/get_films'; // Замените на ваш URL FastAPI сервера

    

    const requestBody = {
        token: token,
    };
    console.log(token)
    try {
        const response = fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                "Content-Type": "application/json" // Указываем тип содержимого
            }
        }).then(response => {
            if (!response.ok) {
              throw new Error(`Ошибка: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Данные:", data);
          })
          .catch(error => {
            console.error("Ошибка:", error);
          });

    } catch (error) {
        console.error('Ошибка при авторизации пользователя:', error);
    }
}
 