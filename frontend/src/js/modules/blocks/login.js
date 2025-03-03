import { transition } from "../functions.js"
import * as consts from "../consts.js"
import * as functions from "../functions.js"


export function renderLogin() {
    const closeBtn = document.getElementById('close')
    const signupBtn1 = document.getElementById('signupBtn1')
    const signForm = document.getElementById('signForm')
    const login = document.getElementById('login')
    const password = document.getElementById('password')

    closeBtn.onclick = () => transition(consts.homeSearch)
    signupBtn1.onclick = () => functions.transition(consts.regSearch)
    signForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('считывание данных логина')

        async function logInUser(email, password) {
            const url = consts.BACKEND_URL+'/api/auth/login'; // Замените на ваш URL FastAPI сервера
        
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
                localStorage.setItem("login", data.login)
                localStorage.setItem("email", email)
                transition(consts.dashboardSearch)
                return data.token;
            } catch (error) {
                // alert('Invalid credentials')
                Swal.fire({
                    title: 'Error!',
                    text: 'Invalid credentials',
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
        logInUser(login.value, password.value);
        
    })
}