import { renderMoviesHtml } from "../html/dashboardHtml.js";
import * as consts from "../consts.js"
import * as dashboardHtml from "../html/dashboardHtml.js";
import { clearColor } from "../functions.js";
import { transition } from "../functions.js"
export function renderMoviesList(moviesData) {
    for (let i = 0; i < moviesData.length; i++) {
        moviesList.insertAdjacentHTML('beforeend', renderMoviesHtml(moviesData[i]));
    }
}

function showSidebar(a, b, c) {
    sidebar.innerHtml = ''
    sidebar.style = `transform:translateX(${a}px);`
    dark.style = `opacity: ${b}; pointer-events: ${c}`
}

function showMovies() {
    dashboardHtml.showMoviesHtml()
    clearColor()
    const moviesBtn = document.getElementById('movies')
    moviesBtn.style.color = consts.accentColor

    const moviesList = document.getElementById('moviesList')

    let token = ''
    const url = 'http://localhost:8000/api/films/get_films'; 
    try{
        token = localStorage.getItem("token")
    } catch (error) {
        console.log(error)
        transition(consts.homeSearch)
    }
    const requestBody = {
        token: token,
    };
    console.log(token)
    try {
        const response = fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                "Content-Type": "application/json" // Указываем тип содержимого
            }
        }).then(response => {
            if (!response.ok) {
              throw new Error(`Ошибка: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Данные:", data);
            let moviesData = data
            renderMoviesList(moviesData)
          })
          .catch(error => {
            console.error("Ошибка:", error);
            transition(consts.homeSearch)
          });

    } catch (error) {
        console.error('Ошибка при авторизации пользователя:', error);
    }
}

function showCollections() {
    dashboardHtml.showCollectionsHtml()
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

function dashboardBtnOnclick() {
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

    dashboardBtnOnclick()
}

function renderCloseBtn() {
    const closeSidebarBtn = document.getElementById('sidebarClose')

    closeSidebarBtn.onclick = () => showSidebar(400, 0, 'none')
}

export function renderDashboard() {
    const profileBtn = document.getElementById('profileBtn')
    const sidebar = document.getElementById('sidebar')
    const dark = document.getElementById('dark')

    dark.onclick = () => showSidebar(400, 0, 'none')
    profileBtn.onclick = () => {
        showSidebar(0, 0.3, 'visible')
        sidebar.innerHTML = dashboardHtml.sidebarProfileHtml()
        renderCloseBtn()
    }

    showDashboardBlocks()

    let token = ''
    const url = 'http://localhost:8000/api/films/get_films'; 
    try{
        token = localStorage.getItem("token")
    } catch (error) {
        console.log(error)
        transition(consts.homeSearch)
    }
    const requestBody = {
        token: token,
    };
    console.log(token)
    try {
        const response = fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                "Content-Type": "application/json" // Указываем тип содержимого
            }
        }).then(response => {
            if (!response.ok) {
              throw new Error(`Ошибка: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Данные:", data);
            let movies = data
          })
          .catch(error => {
            console.error("Ошибка:", error);
            transition(consts.homeSearch)
          });

    } catch (error) {
        console.error('Ошибка при авторизации пользователя:', error);
    }
    console.log(movies)
}
