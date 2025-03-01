import * as functions from "./modules/functions.js";
import { showBlocks } from "./modules/showBlocks.js";
import * as consts from "./modules/consts.js";

function render() {
    if ((new URL(window.location.href)).search == "") {
        if (false) { //если залогинен, то перебрасвает сразу на дешборд
            functions.searchUpdate(consts.dashboardSearch, '')
        }
        else {
            functions.searchUpdate(consts.homeSearch, '')
        }
    }

    functions.isWebp();
    showBlocks()
}

render()