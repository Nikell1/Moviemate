import * as consts from "./consts.js"
import { homeHtml } from "./html/home.js"
import { renderHomeBtn } from "./blocks/home.js"
import { renderLogin } from "./blocks/login.js"
import { renderSignup } from "./blocks/signup.js"
import { loginHtml } from "./html/login.js"
import { signupHtml } from "./html/signup.js"


const wpapper = document.getElementById('wrapper')

function showHome() {
    homeHtml()
    renderHomeBtn()
}

function showLogin() {
    loginHtml()
    renderLogin()
}

function showSignUp() {
    signupHtml()
    renderSignup()
}

function showDashboard() {
    dashboardHtml()
}

export function showBlocks() {
    let url = new URL(window.location.href)

    if (url.hash == `#${consts.homeHash}`) {showHome()}
    if(url.hash == `#${consts.loginHash}`) {showLogin()}
    if(url.hash == `#${consts.regHash}`) {showSignUp()}
    if (url.hash == `#${consts.dashboardHash}`) {showDashboard()}
}