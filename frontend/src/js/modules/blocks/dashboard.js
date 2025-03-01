import { renderMoviehHtml } from "../html/dashboardHtml.js";
import * as consts from "../consts.js"
import { transition } from "../functions.js"
export function renderMoviesList() {
    
}

export function renderDashboard() {
    try{
        let token = localStorage.getItem("token")
    } catch (error) {
        console.log(error)
        transition(consts.homeHash)
    }
}