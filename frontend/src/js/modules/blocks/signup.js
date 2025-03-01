import { transition } from "../functions.js"
import * as consts from "../consts.js"


export function renderSignup() {
    const closeBtn = document.getElementById('close')
    closeBtn.onclick = () => transition(consts.homeHash)
    const signForm = document.getElementById('signForm')

    signForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('считывание данных рега')
    })
}