import { renderMoviesHtml } from "../html/dashboardHtml.js";
import * as consts from "../consts.js"
import * as dashboardHtml from "../html/dashboardHtml.js";
import { clearColor } from "../functions.js";
import { transition } from "../functions.js"
import { renderAddMovieHtml } from "../html/dashboardHtml.js";


export function renderMoviesList(moviesData) {
    moviesList.innerHTML = ''

    for (let i = 0; i < moviesData.length; i++) {
        console.log(moviesData[i].watched)
        if (moviesData[i].watched == false){
            moviesData[i].watched = "Mark as watched"
        } else if (moviesData[i].watched == true){
            moviesData[i].watched = "Mark as unwatched"
        }
        moviesList.insertAdjacentHTML('beforeend', renderMoviesHtml(moviesData[i]));
    }

    if (moviesData,length == 0) {
        moviesList.innerHTML = `<p>You haven't added any movies to your bookmarks yet</p>`
    }
}

function showAddMovieModal(a, b, c) {
    const modal = document.getElementById('modal')
    modal.innerHTML = ''

    modal.style = `opacity:${a}; pointer-events: ${b};`
    dark.style = `opacity:${c}; pointer-events: ${b};`
}

function showSidebar(a, b, c) {
    sidebar.innerHtml = ''
    sidebar.style = `transform:translateX(${a}px);`
    dark.style = `opacity: ${b}; pointer-events: ${c}`
}

function addMovieRender() {
    const addMovieBtn = document.getElementById('addMovie')

    addMovieBtn.onclick = () => {
        showAddMovieModal(1, 'visible', 0.3)
        renderAddMovieHtml()

        const moviesForm = document.getElementById('moviesForm')

        moviesForm.addEventListener('submit', (event) => {
            event.preventDefault()

            console.log('считывание списка фильмов')
        })
    }
}

function showMovies() {
    dashboardHtml.showMoviesHtml()
    clearColor()
    const moviesBtn = document.getElementById('movies')
    moviesBtn.style.color = consts.accentColor

    const moviesList = document.getElementById('moviesList')

    addMovieRender()

    let token = ''
    const url = 'http://localhost:8000/api/films/get_films'; 
    const profile_nickname = document.getElementById('profile_nickname')
    try{
        token = localStorage.getItem("token")
        const login = localStorage.getItem("login")    
        profile_nickname.textContent = login

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

    dark.onclick = () => {
        showSidebar(400, 0, 'none')
        showAddMovieModal(0, 'none', 0)
    }
    profileBtn.onclick = () => {
        showSidebar(0, 0.3, 'visible')
        const login = localStorage.getItem("login") 
        sidebar.innerHTML = dashboardHtml.sidebarProfileHtml(login)
        renderCloseBtn()
    }

    showDashboardBlocks()
}
