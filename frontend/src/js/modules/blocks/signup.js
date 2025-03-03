import { transition } from "../functions.js"
import * as consts from "../consts.js"


export function renderSignup() {
    const closeBtn = document.getElementById('close')
    const signForm = document.getElementById('signForm')
    const loginBtn = document.getElementById('loginBtn')
    const login = document.getElementById('login')
    const password = document.getElementById('password')
    const email = document.getElementById('email')

    closeBtn.onclick = () => transition(consts.homeSearch)
    loginBtn.onclick = () => transition(consts.loginSearch)
    signForm.addEventListener('submit', (event) => {
        event.preventDefault();
        async function registerUser(email, password, login) {
            const url = consts.BACKEND_URL+'/api/auth/register'; // Замените на ваш URL FastAPI сервера
        
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
                transition(consts.dashboardSearch)
                return data.token;
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something is wrong with your request',
                    icon: 'error', // Иконка ошибки
                    confirmButtonText: 'ОК',
                    customClass: {
                        popup: 'custom-popup' // Добавляем класс для окна
                    }
                });
                console.error('Ошибка при авторизации пользователя:', error);
            }
        }
        
        // Пример вызова функции
        console.log(login.value, password.value)
        registerUser(email.value, password.value, login.value);
    })
    
}