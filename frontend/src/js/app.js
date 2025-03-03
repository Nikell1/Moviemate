import * as functions from "./modules/functions.js";
import { showBlocks } from "./modules/showBlocks.js";
import * as consts from "./modules/consts.js";

function render() {
    if ((new URL(window.location.href)).search == "") {
        try{
            const token = localStorage.getItem("token")
            functions.searchUpdate(consts.dashboardSearch, '')
        } catch (error){

            functions.searchUpdate(consts.homeSearch, '')
        }
        // if (false) { //если залогинен, то перебрасвает сразу на дешборд
        // }
        // else {
        // }
    }

    functions.isWebp();
    showBlocks()
}

render()