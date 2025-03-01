import { renderMoviesHtml } from "../html/dashboardHtml.js";
import * as consts from "../consts.js"
import { showMoviesHtml } from "../html/dashboardHtml.js";

export function renderMoviesList() {
    
}

function showSidebar(a, b, c) {
    sidebar.style = `transform:translateX(${a}px);`
    dark.style = `opacity: ${b}; pointer-events: ${c}`
}

function clearColor() {
    const moviesBtn = document.getElementById('movies')
    const collectionsBtn = document.getElementById('collections')
    const friendsBtn = document.getElementById('friends')
    const searchBtn = document.getElementById('search')

    friendsBtn.style.color = '#fff'
    searchBtn.style.color = '#fff'
    collectionsBtn.style.color = '#fff'
    moviesBtn.style.color = '#fff'
}

function showMovies() {
    showMoviesHtml()
    clearColor()
    const moviesBtn = document.getElementById('movies')
    moviesBtn.style.color = consts.accentColor

}

function showCollections() {
    showCollectionsHtml()
    clearColor()
    const collectionsBtn = document.getElementById('collections')
    collectionsBtn.style.color = consts.accentColor
}

function showFriends() {
    clearColor()
    const friendsBtn = document.getElementById('friends')
    friendsBtn.style.color = consts.accentColor
}

function showSearch() {
    clearColor()
    const searchBtn = document.getElementById('search')
    searchBtn.style.color = consts.accentColor
}

function updateHash(req) {
    let url = new URL(window.location.href)
    url.hash = req
    window.location.href = url
}

function showDashboardBlocks() {
    let url = new URL(window.location.href) 

    if (url.hash == '') {
        updateHash(consts.moviesHash)
    }
    let url2 = new URL(window.location.href) 

    if (url2.hash == `#${consts.moviesHash}`) {showMovies()}
    if (url2.hash == `#${consts.collectionsHash}`) {showCollections()}
    if (url2.hash == `#${consts.friendsHash}`) {showFriends()}
    if (url2.hash == `#${consts.searchHash}`) {showSearch()}

    const moviesBtn = document.getElementById('movies')
    const collectionsBtn = document.getElementById('collections')
    const friendsBtn = document.getElementById('friends')
    const searchBtn = document.getElementById('search')

    moviesBtn.onclick = () => {
        updateHash(consts.moviesHash)
        showDashboardBlocks()
    }

    collectionsBtn.onclick = () => {
        updateHash(consts.collectionsHash)
        showDashboardBlocks()
    }

    friendsBtn.onclick = () => {
        updateHash(consts.friendsHash)
        showDashboardBlocks()
    }

    searchBtn.onclick = () => {
        updateHash(consts.searchHash)
        showDashboardBlocks()
    }
}

export function renderDashboard() {
    const profileBtn = document.getElementById('profileBtn')
    const sidebar = document.getElementById('sidebar')
    const dark = document.getElementById('dark')

    dark.onclick = () => showSidebar(400, 0, 'none')
    profileBtn.onclick = () => showSidebar(0, 0.3, 'visible')

    showDashboardBlocks()
}