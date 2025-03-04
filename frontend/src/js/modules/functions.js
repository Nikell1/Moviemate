import { showBlocks } from "./showBlocks.js";

export function isWebp() {
    function testWebp(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }
    testWebp(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    })
}

export function searchUpdate(req) {
    let url = new URL (window.location.href)
    url.search = req
    window.location.href = url
}

export function transition(search) {
    searchUpdate(search)
    showBlocks()
}

export function clearColor() {
    const moviesBtn = document.getElementById('movies')
    const collectionsBtn = document.getElementById('collections')
    const searchBtn = document.getElementById('search')

    searchBtn.style.color = '#fff'
    collectionsBtn.style.color = '#fff'
    moviesBtn.style.color = '#fff'
}