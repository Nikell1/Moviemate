import * as consts from "./consts.js"
import { homeHtml } from "./html/home.js"
import { renderHomeBtn } from "./blocks/home.js"
import { renderLogin } from "./blocks/login.js"
import { renderSignup } from "./blocks/signup.js"
import { loginHtml } from "./html/login.js"
import { signupHtml } from "./html/signup.js"
import { dashboardHtml } from "./html/dashboardHtml.js"
import { renderDashboard } from "./blocks/dashboard.js"



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
    renderDashboard()
}

export function showBlocks() {
    let url = new URL(window.location.href)

    if (url.search == `?${consts.homeSearch}`) {showHome()}
    if(url.search == `?${consts.loginSearch}`) {showLogin()}
    if(url.search == `?${consts.regSearch}`) {showSignUp()}
    if (url.search == `?${consts.dashboardSearch}`) {showDashboard()}
}