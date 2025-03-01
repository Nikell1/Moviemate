import * as functions from "./modules/functions.js";
import { showBlocks } from "./modules/showBlocks.js";
import * as consts from "./modules/consts.js";

function render() {
    if ((new URL(window.location.href)).hash == "") {
        functions.hashUpdate(consts.homeHash, '')
    }

    functions.isWebp();
    showBlocks()
}

render()