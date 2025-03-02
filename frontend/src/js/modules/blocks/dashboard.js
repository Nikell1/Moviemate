import { renderMoviesHtml } from "../html/dashboardHtml.js";
import * as consts from "../consts.js"
import * as dashboardHtml from "../html/dashboardHtml.js";
import { clearColor } from "../functions.js";
import { transition } from "../functions.js"
import { renderAddMovieHtml } from "../html/dashboardHtml.js";
import { renderMovieCardModalHtml } from "../html/dashboardHtml.js";


export function renderMoviesList(moviesData) {
    moviesList.innerHTML = ''

    for (let i = 0; i < moviesData.length; i++) {
        console.log(moviesData[i].watched)
        if (moviesData[i].watched == false){
            moviesData[i].watched = "Mark as watched"
        } else if (moviesData[i].watched == true){
            moviesData[i].watched = "Mark as unwatched"
        }
        moviesList.insertAdjacentHTML('beforeend', renderMoviesHtml(moviesData[i]))
    }

    if (moviesData.length == 0) {
        moviesList.innerHTML = `<p>You haven't added any movies to your bookmarks yet</p>`
    }
    for (let i = 0; i < moviesData.length; i++){
        console.log(`mark_${moviesData[i].id}`)
        const current_mark_button = document.getElementById(`mark_${moviesData[i].id}`)
        current_mark_button.onclick = () => {
            console.log(current_mark_button.textContent)
            if (current_mark_button.textContent == "Mark as watched"){
                current_mark_button.textContent = "Mark as unwatched"
            }
            else{
                current_mark_button.textContent = "Mark as watched" 
            }

            try {
                const token = localStorage.getItem("token")
                const url = 'http://localhost:8000/api/films/mark_as_watched'; // Замените на ваш URL FastAPI сервера
                const params = new URLSearchParams({
                    "id": moviesData[i].id,
                });
            
                const urlWithParams = `${url}?${params}`; // Добавляем параметры к URL
                const response = fetch(urlWithParams, {
                    method: 'PUT',
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
                    console.log(data.results)
                    let moviesData = data
                    // renderMoviesList(moviesData)
                  })
                  .catch(error => {
                    console.error("Ошибка:", error);
                    // transition(consts.homeSearch)
                  });
        
            } catch (error) {
                console.error('Ошибка при авторизации пользователя:', error);
            }



        }
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


function showMovieCardModal(a, b, c) {
    movieCardModal.style = `opacity: ${a}; pointer-events: ${b};`
    topDark.style = `opacity: ${c}; pointer-events: ${b};`
}
function renderModalMoviesList(data) {
    const modalMoviesList = document.getElementById('modalMoviesList')
    modalMoviesList.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        modalMoviesList.insertAdjacentHTML('beforeend', dashboardHtml.renderModalMoviesHtml(data[i], i))
    }

    if (data.length == 0) {
        modalMoviesList.innerHTML = `<h2>Movies not found</h2>`
    }
    modalMoviesList.onclick = (event) => {
        let ind = event.target.dataset.index
        let type = event.target.dataset.type
        const movieCardModal = document.getElementById('movieCardModal')
        const topDark = document.getElementById('topDark')
        topDark.onclick = () => {showMovieCardModal(0, 'none', 0)}

        if (type == 'movie') {
            showMovieCardModal(1, 'visible', 0.5)
            renderMovieCardModalHtml(data[ind], ind)

            const addToDashboard = document.getElementById('addToDashboard')
            addToDashboard.onclick = () => {

                console.log('добавление фильма')
                const token = localStorage.getItem("token")
                const url = 'http://localhost:8000/api/films/film'; // Замените на ваш URL FastAPI сервера
                console.log(data)
                console.log(data[ind].media_type)
                const requestBody = {
                    "media_id": data[ind].id,
                    "media_type": data[ind].media_type,                  
                };
            
                try {
                    const response = fetch(url, {
                        method: 'POST',
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    });
            


                    transition(consts.dashboardSearch)
                    
                } catch (error) {
                    console.error('Ошибка при авторизации пользователя:', error);
                }
            }
        }
    }
}

function addMovieRender() {
    const addMovieBtn = document.getElementById('addMovie')

    addMovieBtn.onclick = () => {
        showAddMovieModal(1, 'visible', 0.3)
        renderAddMovieHtml()

        const moviesForm = document.getElementById('moviesForm')
        const addOwnBtn = document.getElementById('addOwn')
        
        addOwnBtn.onclick = () => {
            modal.innerHTML = dashboardHtml.addOwnHtml()
            const addOwnForm = document.getElementById('addOwnForm')

            addOwnForm.addEventListener('submit', (event) => {
                event.preventDefault()
                console.log(1243)

                let title_input = document.getElementById("title_input")
                let date_input = document.getElementById("date_input")
                let description_input = document.getElementById("description_input")

                const token = localStorage.getItem("token")
                const url = 'http://localhost:8000/api/films/create_film'; // Замените на ваш URL FastAPI сервера
                        
                const requestBody = {
                    "title": title_input.value,
                    "description": description_input.value,
                    "date": date_input.value,
                    "image_url": "null"
                };
            
                try {
                    const response = fetch(url, {
                        method: 'POST',
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    });
            
                    // if (!response.ok) {
                    //     throw new Error(`Ошибка: ${response.status}`);
                    // }
            
                    // const data = response.json();
                    // console.log(data)

                    transition(consts.dashboardSearch)
                    return data.token;
                } catch (error) {
                    console.error('Ошибка при авторизации пользователя:', error);
                }
            })
        }

        moviesForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const search_input = document.getElementById('search__input')
        const token = localStorage.getItem('token')
        console.log('считывание списка фильмов')

        const url = 'http://localhost:8000/api/films/search_film'; // Замените на ваш URL FastAPI сервера
        const params = new URLSearchParams({
            "search": search_input.value,
        });
    
        const urlWithParams = `${url}?${params}`; // Добавляем параметры к URL
            try {
                const response = fetch(urlWithParams, {
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
                    console.log(data.results)
                    renderModalMoviesList(data.results)

                    // renderMoviesList(moviesData)
                  })
                  .catch(error => {
                    console.error("Ошибка:", error);
                    // transition(consts.homeSearch)
                  });
        
            } catch (error) {
                console.error('Ошибка при авторизации пользователя:', error);
            }

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

        const logoutBtn = document.getElementById('logoutBtn')
        logoutBtn.onclick = () => {
            const token = localStorage.getItem("token")
            const url = 'http://localhost:8000/api/auth/logout'; // Замените на ваш URL FastAPI сервера
                    
            const requestBody = {
                "token": token,
            };
        
            try {
                const response = fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
        
 
                localStorage.removeItem("token")
                localStorage.removeItem("email")   
                localStorage.removeItem("login")

                transition(consts.homeSearch)
                
            } catch (error) {
                console.error('Ошибка при авторизации пользователя:', error);
            }
        }
    }

    showDashboardBlocks()
}
