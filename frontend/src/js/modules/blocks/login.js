import { transition } from "../functions.js"
import * as consts from "../consts.js"
import * as functions from "../functions.js"


export function renderLogin() {
    const closeBtn = document.getElementById('close')
    const signupBtn1 = document.getElementById('signupBtn1')
    const signForm = document.getElementById('signForm')
    const login = document.getElementById('login')
    const password = document.getElementById('password')

    closeBtn.onclick = () => transition(consts.homeHash)
    signupBtn1.onclick = () => functions.transition(consts.regHash)
    signForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('считывание данных логина')

        async function logInUser(email, password) {
            const url = 'http://localhost:8000/api/auth/login'; // Замените на ваш URL FastAPI сервера
        
            const requestBody = {
                email: email,
                password: password
            };
        
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
        
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }
        
                const data = await response.json();
                console.log(data)
                console.log('Токен:', data.token); // Предполагается, что сервер возвращает токен в поле "token"
                localStorage.setItem("token", data.token)
                return data.token;
            } catch (error) {
                console.error('Ошибка при авторизации пользователя:', error);
            }
        }
        
        // Пример вызова функции
        console.log(login.textContent, password.textContent)
        logInUser(login.textContent, password.textContent,);
        
    })
}