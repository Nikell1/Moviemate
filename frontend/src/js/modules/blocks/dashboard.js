import { renderMoviesHtml } from "../html/dashboardHtml.js";
import * as consts from "../consts.js"
import * as dashboardHtml from "../html/dashboardHtml.js";
import { clearColor } from "../functions.js";
import { transition } from "../functions.js"
import { renderAddMovieHtml } from "../html/dashboardHtml.js";
import { renderMovieCardModalHtml } from "../html/dashboardHtml.js";

console.log('получение .env')

function getRand() {
    const token = localStorage.getItem("token")
                const url = consts.BACKEND_URL+'/api/films/get_rand_film'; // Замените на ваш URL FastAPI сервера
                let mood = document.getElementById('mood').value
                console.log(mood)
                if (mood == "Joyful"){
                    mood = "Весёлое"
                } else if (mood == "Serious") {
                    mood = "Серьёзное"
                } else if (mood == "Tense"){
                    mood = "Напряжённое"
                }
                
                const params = new URLSearchParams({
                    "mood": mood,
                });
                
                let urlWithParams = `${url}?${params}`; 
                
                if (mood == "Any") {
                    urlWithParams = url
                }

                console.log(urlWithParams, mood)
            
                try {
                    const response = fetch(urlWithParams, {
                        method: 'GET',
                        headers: {
                            "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                            'Content-Type': 'application/json'
                        },
                    })
                    .then(response => {
                        console.log(response); // Логируем объект ответа
                        console.log(response.status)
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                
                        return response.json(); // Парсим тело ответа как JSON
                    })
                    .then(data => {
                        console.log(data); // Логируем данные
                        modal.innerHTML = dashboardHtml.renderGetMovieEndHtml(data)
                        const ok_movie = document.getElementById("ok_movie")
                        ok_movie.onclick = () => {
                            showAddMovieModal(0, 'none', 0)
                        }
                        const another_movie = document.getElementById("another_movie")
                        another_movie.onclick = () => {
                            dashboardHtml.getMovieHtml()
                            getMovieModal.onclick = () =>  {
                                getRand()
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error); // Логируем ошибки
                    });
                    // transition(consts.dashboardSearch)
                    
                } catch (error) {
                    console.error('Ошибка при авторизации пользователя:', error);
                }
}

function renderGetMovie() {
    const getMovie = document.getElementById('getMovie')

    getMovie.onclick = () => {
        showAddMovieModal(1, 'visible', 0.3)
        dashboardHtml.getMovieHtml()
        
        const getMovieModal = document.getElementById('getMovieModal')
        getMovieModal.onclick = () => {
            
            getRand()
        }
    }
}

export function renderMoviesList(moviesData, a) {
    moviesList.innerHTML = ''

    for (let i = 0; i < moviesData.length; i++) {
        console.log(moviesData[i].watched)
        if (moviesData[i].watched == false){
            moviesData[i].watched = "Mark as watched"
        } else if (moviesData[i].watched == true){
            moviesData[i].watched = "Mark as unwatched"
        }
        if (new URL(window.location.href).hash != `#${consts.searchHash}`) {
            moviesList.insertAdjacentHTML('beforeend', renderMoviesHtml(moviesData[i], a, moviesData[i].id))
        } else {
            moviesList.insertAdjacentHTML('beforeend', renderMoviesHtml(moviesData[i], a, moviesData[i].id, ''))
        }
    }

    if (moviesData.length == 0) {
        moviesList.innerHTML = `<p>No movies</p>`
    }
    if (new URL(window.location.href).hash != `#${consts.searchHash}`) {
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
                    const url = consts.BACKEND_URL+'/api/films/mark_as_watched'; // Замените на ваш URL FastAPI сервера
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
        for (let i = 0; i < moviesData.length; i++){
            console.log(`delete_${moviesData[i].id}`)
            const current_mark_button = document.getElementById(`delete_${moviesData[i].id}`)
            current_mark_button.onclick = () => {
                console.log(current_mark_button.textContent)
                
    
                try {
                    const token = localStorage.getItem("token")
                    const url = consts.BACKEND_URL+'/api/films/film'; // Замените на ваш URL FastAPI сервера
                    const params = new URLSearchParams({
                        "media_id": moviesData[i].id,
                    });

                
                    const urlWithParams = `${url}?${params}`; // Добавляем параметры к URL
                    const response = fetch(urlWithParams, {
                        method: 'DELETE',
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
                        transition(consts.dashboardSearch)
                    })
                    .catch(error => {
                        transition(consts.dashboardSearch)
                        console.error("Ошибка:", error);
                        // transition(consts.homeSearch)
                      });
            
                } catch (error) {
                    console.error('Ошибка при авторизации пользователя:', error);
                }
    
    
    
            }
        }
    }

    const addToCollectionList = Array.from(document.getElementsByName('addToCollection'))

    addToCollectionList.forEach(el => el.onclick = () => {
        localStorage.setItem("cur_movie", el.id)
        addToCollection()
    })
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
                const url = consts.BACKEND_URL+'/api/films/film'; // Замените на ваш URL FastAPI сервера
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
                    })
                    .then(data => {
                        transition(consts.dashboardSearch)
                        
                    })
                    .catch(error => {
                        console.error('Error:', error); // Логируем ошибки
                    });
            

                    
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
                const url = consts.BACKEND_URL+'/api/films/create_film'; // Замените на ваш URL FastAPI сервера
                        
                const requestBody = {
                    "title": title_input.value,
                    "description": description_input.value,
                    "date": date_input.value,
                    "image_url": "https://avatars.mds.yandex.net/i?id=1683d076e80887c04421aabf3b0879ee_l-4420695-images-thumbs&n=13"
                };
            
                try {
                    const response = fetch(url, {
                        method: 'POST',
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    })
                    .then(data => {
                        transition(consts.dashboardSearch)
                        
                    })
                    .catch(error => {
                        console.error('Error:', error); // Логируем ошибки
                    });
            
                    // if (!response.ok) {
                    //     throw new Error(`Ошибка: ${response.status}`);
                    // 
                } catch (error) {
                    console.error('Ошибка при авторизации пользователя:', error);
                }
            })
        }


        moviesForm.addEventListener('submit', (event) => {
        modalMoviesList.innerHTML = '<div id="loader2" class="loader"></div>'
        const loader = document.getElementById('loader2')
        event.preventDefault()
        loader.style.display = 'block'
        const search_input = document.getElementById('search__input')
        const token = localStorage.getItem('token')
        console.log('считывание списка фильмов')

        const url = consts.BACKEND_URL+'/api/films/search_film'; // Замените на ваш URL FastAPI сервера
        const params = new URLSearchParams({
            "search": search_input.value,
        });
    
        const requestBody = {
            release_date_low: "0001-01-01"
        }

        const urlWithParams = `${url}?${params}`; 
            try {
                const response = fetch(urlWithParams, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                        "Content-Type": "application/json", // Указываем тип содержимого
                    },
                    body: JSON.stringify(requestBody)
                }).then(response => {
                    if (!response.ok) {
                        console.log(response)
                        Swal.fire({
                          title: 'Error!',
                          text: 'Something went wrong',
                          icon: 'error', // Иконка ошибки
                          confirmButtonText: 'ОК',
                          customClass: {
                              popup: 'custom-popup' // Добавляем класс для окна
                          }
                      });
                      transition(consts.dashboardSearch)
                        throw new Error(`Ошибка: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then(data => {
                    console.log("Данные:", data);
                    console.log(data.results)
                    loader.style.display = 'none'
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

function movieSearchRender() {
    const searchInMoviesForm = document.getElementById('searchInMoviesForm')

    const filtesForm = document.getElementById('filtesForm')
    const year1 = document.getElementById('year1')
    const year2 = document.getElementById('year2')
    const year3 = document.getElementById('year3')
    const year4 = document.getElementById('year4')
    year1.addEventListener('input', () => {
        year3.value = year1.value
        if (parseInt(year1.value) > parseInt(year2.value)) {
            year1.value = year2.value;
          }
          if (parseInt(year3.value) > parseInt(year4.value)) {
              year3.value = year4.value;
            }
    })
    year2.addEventListener('input', () => {
        year4.value = year2.value
        if (year2.value < year1.value) {
            year2.value = year1.value
        }
        if (year4 > year3) {
            year4 = year3
        }
    })
    year3.addEventListener('input', () => {
        year1.value = year3.value
        if (parseInt(year3.value) > parseInt(year4.value)) {
            year3.value = year4.value;
          }
          if (parseInt(year1.value) > parseInt(year2.value)) {
            year1.value = year2.value;
          }
    })
    year4.addEventListener('input', () => {
        year2.value = year4.value
        if (parseInt(year3.value) > parseInt(year4.value)) {
            year4.value = year3.value;
          }
          if (parseInt(year1.value) > parseInt(year2.value)) {
            year2.value = year1.value;
          }
    })
    const loader = document.getElementById('loader3')
    loader.style.display = 'none'

    filtesForm.addEventListener('submit', (event) => {
        loader.style.display = 'block'

        event.preventDefault()
        try {
            const token = localStorage.getItem("token")
        } catch (error){
            transition(consts.homeSearch)
            console.log(error)
        }
        console.log('нефильрованное пиво')
        const url = consts.BACKEND_URL + "/api/films/get_films_by_title"
        const year1 = document.getElementById("year1")
        const year2 = document.getElementById("year2")
        const watched_checkbox = document.getElementById("watched_checkbox")
        const unwatched_checkbox = document.getElementById("unwatched_checkbox")
        const genre_filter = document.getElementById("genre_filter")
        const search_in_bookmarks = document.getElementById('search_in_bookmarks')

        console.log(year1.value)
        console.log(watched_checkbox.checked)
        console.log(genre_filter.value)
        console.log(search_in_bookmarks.value)

        let release_date_low = `${year1.value}-01-01`
        let release_date_high = `${year2.value}-12-31`
        const genre_ids = {
            'Action': "28",
            'Adventure': "12",
            'Animation': "16",  
            'Comedy': "35",
            'Crime': "80",
            'Documentary': "99",
            'Drama': "18",
            'Family': "10751",
            'Fantasy': "14",
            'History': "36",
            'Horror': "27",
            'Music': "10402",
            'Mystery': "9648",
            'Romance': "10749",
            'Science Fiction': "878",
            'TV Movie': "10770",
            'Thriller': "53",
            'War': "10752",
            'Western': "37",
            'Talk': "10767"
        }
        let genre_id = genre_ids[genre_filter.value]
        let reqbody
        if (watched_checkbox.checked && unwatched_checkbox.checked){
            reqbody = {
                release_date_low: release_date_low,
                release_date_high: release_date_high,
                genre_ids: [genre_id]
            };
            console.log(reqbody)
        } else if (!watched_checkbox.checked && unwatched_checkbox.checked){
            reqbody = {
                release_date_low: release_date_low,
                release_date_high: release_date_high,
                genre_ids: [genre_id],
                watched: false
            };
            console.log(reqbody)

        } else if (watched_checkbox.checked && !unwatched_checkbox.checked){
            reqbody = {
                release_date_low: release_date_low,
                release_date_high: release_date_high,
                genre_ids: [genre_id],
                watched: true
            };
            console.log(reqbody)
        } else if (!watched_checkbox.checked && !unwatched_checkbox.checked){
            console.log("пользак дурак")
            renderMoviesList([])
        }

        if (genre_filter.value == 'Any'){
            delete reqbody.genre_ids;
        }

        const token = localStorage.getItem("token")
        
        if (watched_checkbox.checked || unwatched_checkbox.checked){
            let urlWithParams = url;
            if (search_in_bookmarks.value == ''){
                console.log('пустой search')
            } else {
                const params = new URLSearchParams({
                    "search": search_in_bookmarks.value,
                });
                urlWithParams = `${url}?${params}`; 
            }
            
            console.log(reqbody)
            try {
                const response = fetch(urlWithParams, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                        "Content-Type": "application/json", // Указываем тип содержимого
                    },
                    body: JSON.stringify(reqbody)
                }).then(response => {
                    if (!response.ok) {
                        console.log(response)
                      throw new Error(`Ошибка: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then(data => {
                    console.log("Данные:", data);
                    console.log(data.results)
                    loader.style.display = 'none'
                    renderMoviesList(data)

                
                  })
                  .catch(error => {
                    console.error("Ошибка:", error);
                    // transition(consts.homeSearch)
                  });
        
            } catch (error) {
                console.error('Ошибка при авторизации пользователя:', error);
            }

            
        }




    })

    searchInMoviesForm.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log('поиск закладок')
        const token = localStorage.getItem("token")
        const search_in_bookmarks = document.getElementById("search_in_bookmarks")
        console.log(search_in_bookmarks.value)
        const url = consts.BACKEND_URL+'/api/films/get_films_by_title'; // Замените на ваш URL FastAPI сервера
        const params = new URLSearchParams({
            "search": search_in_bookmarks.value,
        });

        const urlWithParams = `${url}?${params}`; 
            try {
                const response = fetch(urlWithParams, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                        "Content-Type": "application/json", // Указываем тип содержимого
                    },
                    body: JSON.stringify({})
                }).then(response => {
                    if (!response.ok) {
                        console.log(response)
                      throw new Error(`Ошибка: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then(data => {
                    console.log("Данные:", data);
                    console.log(data.results)
                    renderMoviesList(data)

                
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

function showMovies() {
    dashboardHtml.showMoviesHtml()
    clearColor()
    const moviesBtn = document.getElementById('movies')
    moviesBtn.style.color = consts.accentColor

    const moviesList = document.getElementById('moviesList')

    addMovieRender()
    renderGetMovie()
    movieSearchRender()
    renderNewCollectionBtn()
    

    let token = ''
    const url = consts.BACKEND_URL+'/api/films/get_films'; 
    const profile_nickname = document.getElementById('profile_nickname')
    try{
        console.log(1)
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
            localStorage.removeItem("token");
            localStorage.removeItem("login");
            localStorage.removeItem("email");
            
            transition(consts.homeSearch)
          });

    } catch (error) {
        console.error('Ошибка при авторизации пользователя:', error);
    }
}

function renderCollections(data, a='', b, c) {
    const collectionsList = document.getElementById(`collectionsList${a}`)
    collectionsList.innerHTML = ''


    for (let i = 0; i < data.length; i++) {
        collectionsList.insertAdjacentHTML('beforeend', dashboardHtml.renderCollectionHtml(data[i], i, b, c))
    }

    collectionsList.onclick = (event) => {
        let ind = event.target.dataset.index 
        let type = event.target.dataset.type

        if (type == "delete") {
            console.log(ind)
            console.log('удаление коллекции')
            const token = localStorage.getItem("token")
            const url = consts.BACKEND_URL+'/api/collections/collections'; 
            const reqbody = {
                name: ind,
            }
    

                try {
                    const response = fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                        "Content-Type": "application/json", // Указываем тип содержимого
                    },
                    body: JSON.stringify(reqbody)

                })
                transition(consts.dashboardSearch)

        
            } catch (error) {
                console.error('Ошибка при авторизации пользователя:', error);
            }
        } else if (type == 'gen-collection'){
            console.log('открытие окна коллекции')
            console.log(ind)
            showAddMovieModal(1, 'visible', 0.3)
            dashboardHtml.renderCollectionCardHtml(ind)

            const url = consts.BACKEND_URL + '/api/collections/get_films'
            const new_coll_name = document.getElementById('new_coll_name')
            const token = localStorage.getItem("token")
            const reqbody = {
                collection: ind
            }

                try {
                    const response = fetch(url, {
                        method: 'POST',
                        headers: {
                            "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                            "Content-Type": "application/json", // Указываем тип содержимого
                        },
                        body: JSON.stringify(reqbody)
                    }).then(response => {
                        if (!response.ok) {
                            console.log(response)
                        throw new Error(`Ошибка: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("Данные:", data);
                        console.log(data.results)
                        renderModalMoviesList(data)
                    })
                    .catch(error => {
                        console.error("Ошибка:", error);
                        // transition(consts.homeSearch)
                    });
            
                } catch (error) {
                    console.error('Ошибка при авторизации пользователя:', error);
                }




        }
        else if (type == 'modal-collection') {
            console.log('добавление фильма в коллекцию')
            console.log(ind)
            let cur_movie = localStorage.getItem("cur_movie")
            console.log(cur_movie)
            cur_movie = cur_movie.substring(12)

            // cur_movie = parseInt(cur_movie)

        const url = consts.BACKEND_URL + '/api/films/set_collection'
        const new_coll_name = document.getElementById('new_coll_name')
        const token = localStorage.getItem("token")
        const reqbody = {
            media_id: cur_movie,
            collection: ind
        }

            try {
                const response = fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                        "Content-Type": "application/json", // Указываем тип содержимого
                    },
                    body: JSON.stringify(reqbody)
                }).then(response => {
                    if (!response.ok) {
                        console.log(response)
                      throw new Error(`Ошибка: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then(data => {
                    console.log("Данные:", data);
                    console.log(data.results)
                    transition(consts.dashboardSearch)

                
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

function serverCollectinos(a = '' , b, c) {
    const token = localStorage.getItem("token")
    const url = consts.BACKEND_URL+'/api/collections/collections'; 
    try {
        const response = fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                "Content-Type": "application/json", // Указываем тип содержимого
            }
        }).then(response => {
            if (!response.ok) {
                console.log(response)
              throw new Error(`Ошибка: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
              console.log("Данные:", data);
              renderCollections(data, a, b, c) //  сюда передать данные всех коллекцийй

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

function showCollections() {
    dashboardHtml.showCollectionsHtml()
    serverCollectinos()

    renderNewCollectionBtn()

    renderGetMovie()

    


    clearColor()
    const collectionsBtn = document.getElementById('collections')
    collectionsBtn.style.color = consts.accentColor
}
function renderNewCollectionBtn() {
    const newCollectionBtn = document.getElementById('newCollectionBtn')

    newCollectionBtn.onclick = () => {
        showAddMovieModal(1, 'visible', 0.3)
        modal.innerHTML = dashboardHtml.newCollectionHtml()

        const newCollectionForm = document.getElementById('newCollectionForm')
        newCollectionForm.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log('колекшен добавлейшен')

        const url = consts.BACKEND_URL + '/api/collections/collections'
        const new_coll_name = document.getElementById('new_coll_name')
        const token = localStorage.getItem("token")
        const reqbody = {
            name: new_coll_name.value
        }

            try {
                const response = fetch(url, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                        "Content-Type": "application/json", // Указываем тип содержимого
                    },
                    body: JSON.stringify(reqbody)
                }).then(response => {
                    if (!response.ok) {
                        console.log(response)
                      throw new Error(`Ошибка: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then(data => {
                    console.log("Данные:", data);
                    console.log(data.results)
                    transition(consts.dashboardSearch)

                
                  })
                  .catch(error => {
                    console.error("Ошибка:", error);
                    // transition(consts.homeSearch)
                    Swal.fire({
                        title: 'Error!',
                        text: 'There is alredy a collection with this name',
                        icon: 'error', // Иконка ошибки
                        confirmButtonText: 'ОК',
                        customClass: {
                            popup: 'custom-popup' // Добавляем класс для окна
                        }
                    });
                  });
        
            } catch (error) {
                console.error('Ошибка при авторизации пользователя:', error);
            }
        })
    }
}

function renderFilters() {
    const filtesForm = document.getElementById('filtesForm')
    const year1 = document.getElementById('year1')
    const year2 = document.getElementById('year2')
    const year3 = document.getElementById('year3')
    const year4 = document.getElementById('year4')
    year1.addEventListener('input', () => {
        year3.value = year1.value
        if (parseInt(year1.value) > parseInt(year2.value)) {
            year1.value = year2.value;
          }
          if (parseInt(year3.value) > parseInt(year4.value)) {
              year3.value = year4.value;
            }
    })
    year2.addEventListener('input', () => {
        year4.value = year2.value
        if (year2.value < year1.value) {
            year2.value = year1.value
        }
        if (year4 > year3) {
            year4 = year3
        }
    })
    year3.addEventListener('input', () => {
        year1.value = year3.value
        if (parseInt(year3.value) > parseInt(year4.value)) {
            year3.value = year4.value;
          }
          if (parseInt(year1.value) > parseInt(year2.value)) {
            year1.value = year2.value;
          }
    })
    year4.addEventListener('input', () => {
        year2.value = year4.value
        if (parseInt(year3.value) > parseInt(year4.value)) {
            year4.value = year3.value;
          }
          if (parseInt(year1.value) > parseInt(year2.value)) {
            year2.value = year1.value;
          }
    })

    const loader = document.getElementById('loader3')
    loader.style.display = 'none'


    filtesForm.addEventListener('submit', (event) => {
    loader.style.display = 'block'
        event.preventDefault()

        console.log('нефильрованное пив2')
        try {
            const token = localStorage.getItem("token")
        } catch (error){
            transition(consts.homeSearch)
            console.log(error)
        }   
        const url = consts.BACKEND_URL + "/api/films/search_film"
        const year1 = document.getElementById("year1")
        const year2 = document.getElementById("year2")
        const watched_checkbox = document.getElementById("watched_checkbox")
        const unwatched_checkbox = document.getElementById("unwatched_checkbox")
        const genre_filter = document.getElementById("genre_filter")
        const search_in_bookmarks = document.getElementById('search_in_all')

        console.log(year1.value)
        console.log(watched_checkbox.checked)
        console.log(genre_filter.value)
        console.log(search_in_bookmarks.value)

        let release_date_low = `${year1.value}-01-01`
        let release_date_high = `${year2.value}-12-31`
        const genre_ids = {
            'Action': "28",
            'Adventure': "12",
            'Animation': "16",  
            'Comedy': "35",
            'Crime': "80",
            'Documentary': "99",
            'Drama': "18",
            'Family': "10751",
            'Fantasy': "14",
            'History': "36",
            'Horror': "27",
            'Music': "10402",
            'Mystery': "9648",
            'Romance': "10749",
            'Science Fiction': "878",
            'TV Movie': "10770",
            'Thriller': "53",
            'War': "10752",
            'Western': "37",
            'Talk': "10767"
        }
        let genre_id = genre_ids[genre_filter.value]
        let reqbody
        if (watched_checkbox.checked && unwatched_checkbox.checked){
            reqbody = {
                release_date_low: release_date_low,
                release_date_high: release_date_high,
                genre_ids: [genre_id]
            };
            console.log(reqbody)
        } else if (!watched_checkbox.checked && unwatched_checkbox.checked){
            reqbody = {
                release_date_low: release_date_low,
                release_date_high: release_date_high,
                genre_ids: [genre_id],
                watched: false
            };
            console.log(reqbody)

        } else if (watched_checkbox.checked && !unwatched_checkbox.checked){
            reqbody = {
                release_date_low: release_date_low,
                release_date_high: release_date_high,
                genre_ids: [genre_id],
                watched: true
            };
            console.log(reqbody)
        } else if (!watched_checkbox.checked && !unwatched_checkbox.checked){
            console.log("пользак дурак")
            renderMoviesList([])
        }

        if (genre_filter.value == 'Any'){
            delete reqbody.genre_ids;
        }

        const token = localStorage.getItem("token")
        
        if (watched_checkbox.checked || unwatched_checkbox.checked){
            let urlWithParams = url;
            if (search_in_bookmarks.value == ''){
                console.log('пустой search')
                const params = new URLSearchParams({
                    "search": search_in_bookmarks.value,
                });
                urlWithParams = `${url}?${params}`; 
            } else {
                const params = new URLSearchParams({
                    "search": search_in_bookmarks.value,
                });
                urlWithParams = `${url}?${params}`; 
            }
            
            console.log(reqbody)
            try {
                const response = fetch(urlWithParams, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                        "Content-Type": "application/json", // Указываем тип содержимого
                    },
                    body: JSON.stringify(reqbody)
                }).then(response => {
                    if (!response.ok) {
                        console.log(response)
                      throw new Error(`Ошибка: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then(data => {
                    console.log("Данные:", data);
                    console.log(data.results)
                    renderMoviesList(data.results)
                    loader.style.display = 'none'

                
                  })
                  .catch(error => {
                    console.error("Ошибка:", error);
                    // transition(consts.homeSearch)
                  });
        
            } catch (error) {
                console.error('Ошибка при авторизации пользователя:', error);
            }
        }
    })
}

function showSearch() {
    dashboardHtml.searchPageHtml()
    clearColor()
    const searchBtn = document.getElementById('search')
    searchBtn.style.color = consts.accentColor

    renderFilters()

    const findPhotoBtn = document.getElementById('findPhotoBtn')
    const findDescBtn = document.getElementById('findDescBtn')

    findDescBtn.onclick = () => {
        showAddMovieModal(1, 'visible', 0.3)
        dashboardHtml.renderDescHtml()
        const loader = document.getElementById('loader2')
        loader.style.display = 'none'
        const findByDescForm = document.getElementById('findByDescForm')
        
        findByDescForm.addEventListener('submit', (event) => {
        loader.style.display = 'block'
            event.preventDefault()
            console.log('жпт решает x2')
            const url = consts.BACKEND_URL + "/api/ai/search_desc"
            const input_desc = document.getElementById('input_desc')
            const params = new URLSearchParams({
                "description": input_desc.value,
            });
            let urlWithParams = `${url}?${params}`; 
        
            try {
                const response = fetch(urlWithParams, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => {
                    console.log(response); // Логируем объект ответа
                    console.log(response.status)
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
            
                    return response.json(); // Парсим тело ответа как JSON
                })
                .then(data => {
                    console.log(data); // Логируем данные
                    res.textContent = `Result: ${data.title}`
                    loader.style.display = 'none'
                })
                .catch(error => {
                    console.error('Error:', error); // Логируем ошибки
                });
                // transition(consts.dashboardSearch)
                
            } catch (error) {
                console.error('Ошибка при авторизации пользователя:', error);
            }
        })
    }

    findPhotoBtn.onclick = () => {
        showAddMovieModal(1, 'visible', 0.3)
        dashboardHtml.renderPhotoHtml()

        const findByPhotoForm = document.getElementById('findByPhotoForm')
        const image_input = document.getElementById("image_input")
        const loader = document.getElementById('loader2')
        loader.style.display = 'none'
        findByPhotoForm.addEventListener('submit', (event) => {

            event.preventDefault()
            const file = image_input.files[0];

            console.log('жпт решает')

            const formData = new FormData();
            const url = consts.BACKEND_URL + '/api/ai/recognition'
            formData.append('file', file);

            try {
                loader.style.display  = 'block'
                const response = fetch(url, {
                    method: 'POST',
                    body: formData
                }).then(response => {
                    if (!response.ok) {
                        console.log(response)
                      throw new Error(`Ошибка: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then(data => {
                    console.log("Данные:", data);
                    // Вернуть название фильма
                    
                    const res = document.getElementById('res')
                    res.textContent = `Result: ${data}`
                    loader.style.display = 'none'
                
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

    const searchInGlobal = document.getElementById('searchInGlobalForm')
    const loader = document.getElementById('loader')
    loader.style.display = 'none'
    searchInGlobal.addEventListener('submit', (event) => {
        event.preventDefault()
        loader.style.display = 'block'
        console.log('поиск еще один')
        /////////////////////////////////////////////////////////////////////////////////////////
        const token = localStorage.getItem("token")
        const search_in_all = document.getElementById("search_in_all")
        console.log(search_in_all.value)
        const url = consts.BACKEND_URL+'/api/films/search_film'; // Замените на ваш URL FastAPI сервера
        const params = new URLSearchParams({
            "search": search_in_all.value,
        });
        const rbody = {
            release_date_low: "0001-01-01",
        }

        const urlWithParams = `${url}?${params}`; 
            try {
                const response = fetch(urlWithParams, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                        "Content-Type": "application/json", // Указываем тип содержимого
                    },
                    body:  JSON.stringify(rbody)
                }).then(response => {
                    if (!response.ok) {
                        console.log(response)
                      throw new Error(`Ошибка: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then(data => {
                    console.log("Данные:", data);
                    console.log(data.results)
                    // Отрендерить рещультаты глобального поиска
                    renderMoviesList(data.results, 'add to dashboard')
                    loader.style.display = 'none'
                    let moviesData = data.results
                    for (let i = 0; i < moviesData.length; i++){
                        console.log(`mark_${moviesData[i].id}`)
                        const current_mark_button = document.getElementById(`mark_${moviesData[i].id}`)
                        current_mark_button.onclick = () => {
                
                            try {
                                const token = localStorage.getItem("token")
                                const url = consts.BACKEND_URL+'/api/films/film'; // Замените на ваш URL FastAPI сервера

                                const reqbody = {
                                    media_id: moviesData[i].id,
                                    media_type: moviesData[i].media_type,
                                    }
                                const response = fetch(url, {
                                    method: 'POST',
                                    headers: {
                                        "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(reqbody)

                                }).then(response => {
                                    if (!response.ok) {
                                      throw new Error(`Ошибка: ${response.status}`);
                                    }
                                    return response.json();
                                  })
                                  .then(data => {
                                    console.log("Данные:", data);
                                    console.log(data.results)
                                    // alert("Movie has been added to collection")
                                    updateHash(consts.moviesHash)
                                    showDashboardBlocks()
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

                    const addToDashboardSearch = document.getElementsByName('addToDashboardBtn')
                    

                
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

function addToCollection() {
    showAddMovieModal(1, 'visible', 0.3)
    dashboardHtml.addToCollectionHtml()
    serverCollectinos('2', '', 'data-type="modal-collection"')
}

function updateHash(req) {
    let url = new URL(window.location.href)
    url.hash = req
    window.location.href = url
}

function dashboardBtnOnclick() {
    const moviesBtn = document.getElementById('movies')
    const collectionsBtn = document.getElementById('collections')
    const searchBtn = document.getElementById('search')

    moviesBtn.onclick = () => {
        updateHash(consts.moviesHash)
        showDashboardBlocks()
    }

    collectionsBtn.onclick = () => {
        updateHash(consts.collectionsHash)
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
            const url = consts.BACKEND_URL+'/api/auth/logout'; // Замените на ваш URL FastAPI сервера
                    
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

        const editBtn = document.getElementById('editBtn')
        editBtn.onclick = () => {
            showMovieCardModal(1, 'visible', 0.5)
            topDark.onclick = () => {showMovieCardModal(0, 'none', 0)}
            dashboardHtml.editRenderhtml()
            const edit_login_button = document.getElementById('edit_login_button')

            edit_login_button.onclick = () => {
                console.log('Изменение юзернейма')
                const token = localStorage.getItem("token")
                const url = consts.BACKEND_URL+'/api/auth/change_login'; // Замените на ваш URL FastAPI сервера
                const new_login = document.getElementById('new_login')
                const params = new URLSearchParams({
                    "login": new_login.value,
                });


                const urlWithParams = `${url}?${params}`; 
            
                try {
                    const response = fetch(urlWithParams, {
                        method: 'PUT',
                        headers: {
                            "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                            'Content-Type': 'application/json'
                        },
                    });
            
        
                    // localStorage.removeItem("token")
                    // localStorage.removeItem("email")   
                    localStorage.setItem("login", new_login.value)
    
                    transition(consts.dashboardSearch)
                    
                } catch (error) {
                    console.error('Ошибка при авторизации пользователя:', error);
                }               
            }
        }
    }

    showDashboardBlocks()
}
