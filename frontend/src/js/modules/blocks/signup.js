import { transition } from "../functions.js"
import * as consts from "../consts.js"


export function renderSignup() {
    const closeBtn = document.getElementById('close')
    const signForm = document.getElementById('signForm')
    const loginBtn = document.getElementById('loginBtn')
    const login = document.getElementById('login')
    const password = document.getElementById('password')
    const email = document.getElementById('email')

    closeBtn.onclick = () => transition(consts.homeHash)
    loginBtn.onclick = () => transition(consts.loginHash)
    signForm.addEventListener('submit', (event) => {
        event.preventDefault();
        async function registerUser(email, password, login) {
            const url = 'http://localhost:8000/api/auth/register'; // Замените на ваш URL FastAPI сервера
        
            const requestBody = {
                email: email,
                password: password,
                login: login
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
                localStorage.setItem("password", password)
                localStorage.setItem("login", login)
                transition(consts.dashboardHash)
                return data.token;
            } catch (error) {
                console.error('Ошибка при авторизации пользователя:', error);
            }
        }
        
        // Пример вызова функции
        console.log(login.value, password.value)
        registerUser(email.value, password.value, login.value);
    })
    
}