import { transition } from "../functions.js"
import * as consts from "../consts.js"
import * as functions from "../functions.js"


export function renderLogin() {
    const closeBtn = document.getElementById('close')
    const signupBtn1 = document.getElementById('signupBtn1')
    const signForm = document.getElementById('signForm')

    closeBtn.onclick = () => transition(consts.homeHash)
    signupBtn1.onclick = () => functions.transition(consts.regHash)
    signForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('считывание данных логина')
    })
}