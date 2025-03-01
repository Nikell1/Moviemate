import * as consts from '../consts.js'
import * as functions from '../functions.js'

export function renderHomeBtn() {
    const loginBtn = document.getElementById('loginBtn')
    const signupBtn1 = document.getElementById('signupBtn1')
    const signupBtn2 = document.getElementById('signupBtn2')
    console.log(signupBtn1)

    loginBtn.onclick = () => functions.transition(consts.loginHash)
    signupBtn1.onclick = () => functions.transition(consts.regHash)
    signupBtn2.onclick = () => functions.transition(consts.regHash)
}