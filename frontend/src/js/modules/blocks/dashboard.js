import { renderMoviesHtml } from "../html/dashboardHtml.js";
import * as consts from "../consts.js"
import { showMoviesHtml } from "../html/dashboardHtml.js";

export function renderMoviesList() {
    
}

function showSidebar(a, b, c) {
    sidebar.style = `transform:translateX(${a}px);`
    dark.style = `opacity: ${b}; pointer-events: ${c}`
}
function showMovies(moviesBtn) {
    moviesBtn.style.color = consts.accentColor
    showMoviesHtml()
}

function showCollections(collectionsBtn) {
    collectionsBtn.style.color = consts.accentColor
}

function showFriends(friendsBtn) {
    friendsBtn.style.color = consts.accentColor
}

function showSearch(searchBtn) {
    searchBtn.style.color = consts.accentColor
}

function showDashboardBlocks() {
    let url = new URL(window.location.href)
    const moviesBtn = document.getElementById('movies')
    const collectionsBtn = document.getElementById('collections')
    const friendsBtn = document.getElementById('friends')
    const searchBtn = document.getElementById('search')

    moviesBtn.onclick = () => {
        url.search = consts.moviesSearch
        window.location.href = url
    }

    collectionsBtn.onclick = () => {
        url.search = consts.collectionsSearch
        window.location.href = url
    }

    friendsBtn.onclick = () => {
        url.search = consts.friendsSearch
        window.location.href = url
    }

    searchBtn.onclick = () => {
        url.search = consts.searchSearch
        window.location.href = url
    }

    friendsBtn.style.color = '#fff'
    searchBtn.style.color = '#fff'
    collectionsBtn.style.color = '#fff'
    moviesBtn.style.color = '#fff'

    if (url.search == '') {
        url.search = consts.moviesSearch
        window.location.href = url
    }
    if (url.search == `?${consts.moviesSearch}`) {showMovies(moviesBtn)}
    if (url.search == `?${consts.collectionsSearch}`) {showCollections(collectionsBtn)}
    if (url.search == `?${consts.friendsSearch}`) {showFriends(friendsBtn)}
    if (url.search == `?${consts.searchSearch}`) {showSearch(searchBtn)}
}

export function renderDashboard() {
    const profileBtn = document.getElementById('profileBtn')
    const sidebar = document.getElementById('sidebar')
    const dark = document.getElementById('dark')

    dark.onclick = () => showSidebar(400, 0, 'none')
    profileBtn.onclick = () => showSidebar(0, 0.3, 'visible')

    showDashboardBlocks()
}