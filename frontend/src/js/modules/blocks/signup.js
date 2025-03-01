import { transition } from "../functions.js"
import * as consts from "../consts.js"


export function renderSignup() {
    const closeBtn = document.getElementById('close')
    const signForm = document.getElementById('signForm')
    const loginBtn = document.getElementById('loginBtn')

    closeBtn.onclick = () => transition(consts.homeHash)
    loginBtn.onclick = () => transition(consts.loginHash)
    signForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('считывание данных рега')
    })
}