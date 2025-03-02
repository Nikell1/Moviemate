import * as consts from '../consts.js'
import * as functions from '../functions.js'

function showNav(a, b, c) {
    nav.style = `transform: translateX(${a}px);`
    dark.style = `pointer-events: ${b}; opacity: ${c}`
}

export function renderHomeBtn() {
    const loginBtn = document.getElementById('loginBtn')
    const signupBtn1 = document.getElementById('signupBtn1')
    const signupBtn2 = document.getElementById('signupBtn2')

    loginBtn.onclick = () => functions.transition(consts.loginSearch)
    signupBtn1.onclick = () => functions.transition(consts.regSearch)
    signupBtn2.onclick = () => functions.transition(consts.regSearch)

    const burger = document.getElementById('burger')
    const nav = document.getElementById('nav')
    const dark = document.getElementById('dark')

    burger.onclick = () => {showNav(0, 'visible', 0.3)}
    dark.onclick = () => {showNav(400, 'none', 0)}
}