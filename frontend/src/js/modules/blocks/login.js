import { transition } from "../functions.js"
import * as consts from "../consts.js"


export function renderLogin() {
    const closeBtn = document.getElementById('close')

    closeBtn.onclick = () => transition(consts.homeHash)
}