import * as consts from '../consts.js'

export function dashboardHtml() {
    wrapper.innerHTML = `
    <div class="dashboard">
        <nav class="dashboard__nav">
            <span class="logo">MOVIEMATE</span>
            <button id="profileBtn" class="dashboard__profile">
                <img src="https://qrjaecpccsfknzbpdwkw.supabase.co/storage/v1/object/sign/images/free-icon-user-account-12311784.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZnJlZS1pY29uLXVzZXItYWNjb3VudC0xMjMxMTc4NC5wbmciLCJpYXQiOjE3NDA5MTQ3NjksImV4cCI6ODY1NzQwODI4MzY5fQ.kFpGT0zzNqOHuyme8aku0PR9R8UgbvzfAF7NmXAzSAE">
                <span id="profile_nickname">${localStorage.getItem('login')}</span>
            </button>
            <button class="dashboard__burger">
                <div></div>
                <div></div>
                <div></div>
            </button>
        </nav> 
        <div id="dashboardContent">
        </div>
    </div>
    <div class="sidebar" id="sidebar"></div>
    <div class="dark" id="dark"></div>
    <div class="modal" id="modal"></div>
    <div class="movieCardModal" id="movieCardModal"></div>
    <div class="topDark" id="topDark"></div>`
}

export function renderMoviesHtml(element, a=element.watched, b=element.id) {
    const url = consts.BACKEND_URL+'/api/films/get-poster-by-url'; // Замените на ваш URL FastAPI сервера
    const params = new URLSearchParams({
        "url": element.poster_path,
    });
    

    let title

    if (element.name != undefined) {
        title = element.name
    }
    else if (element.title !=  undefined) {
        title = element.title
    }
    if (title.length > 30) {
        title = `${title.slice(0, 30)}...`
    }

    let overview = element.overview

    if (overview.length > 50) {
        overview = `${overview.slice(0, 50)}...`
    }



    const urlWithParams = `${url}?${params}`; // Добавляем параметры к URL
    return `            
            <li class="movies-element">
                <div class="movies-element__delete">🗑</div>
                <div class="movies-element__img" style="background-image: url('${urlWithParams}');"></div>
                <div class="movies-element__block">
                    <span>${title}</span>
                    <span>${element.release_date}</span>
                </div>
                <p class="movies-element__description">${overview}</p>
                <div class="movies-element__bottom">
                    <button class="movies-element__btn1" name="addToDashboardBtn" id="mark_${b}">${a}</button>
                    <button class="movies-element__btn2" id="add_to_coll_${b}" name="addToCollection">Add to collection</button>
                </div>
            </li>`
}

export function showMoviesHtml() {
    const dashboardContent = document.getElementById('dashboardContent')
    dashboardContent.innerHTML = `
        <div class="dashboard__block">
            <h1>Your movie <span>dashboard</span></h1>
            <div class="dashboard__rightBtns">
                <button id="addMovie">Add movie</button>
                <button id="newCollectionBtn">New collection</button>
            </div>
        </div>
        <div class="dashboard__botBtns">
            <button id="movies">Your movies</button>
            <button id="collections">Collections</button>
            <button id="search">Search</button>
        </div>
        <form id="searchInMoviesForm" class="dashboard__search"><input id="search_in_bookmarks" placeholder="Find movie in your bookmarks"></form>
        <div class="movies-block">
            <ul class="movies-list" id="moviesList"><div class="loader"></div></ul>
            <form id="filtesForm" class="filter-form">
                <div class="range-slider">
                    <input id="year3" type="range" min="1900" max="2026" value="1900" id="range-min">
                    <input id="year4" type="range" min="1900" max="2030" value="2030" id="range-max">
                </div>
                <div class="filter-form__years"><input value="1900" id="year1"><input id="year2" value="2030"></div>
                <div class="filter-form__block">
                    <span>Genre:</span>
                    <select class="select">
                        <option>Any</option>
                        <option>Action</option>
                        <option>Adventure</option>
                        <option>Animation</option>
                        <option>Comedy</option>
                        <option>Crime</option>
                        <option>Documentary</option>
                        <option>Drama</option>
                        <option>Family</option>
                        <option>Fantasy</option>
                        <option>History</option>
                        <option>Horror</option>
                        <option>Music</option>
                        <option>Mystery</option>
                        <option>Romance</option>
                        <option>Science Fiction</option>
                        <option>TV Movie</option>
                        <option>Thriller</option>
                        <option>War</option>
                        <option>Western</option>
                        <option>Talk</option>
                    </select>
                </div>
                <div class="filter-form__checkbox"><input type="checkbox" checked><span>Watched</span></div>
                <div class="filter-form__checkbox"><input type="checkbox" checked><span>Unwatched</span></div>
                <button id="apply_filters">Apply filters</button>
            </form>
        </div>
        <button class="fixBtn" id="getMovie">GET A MOVIE</button>`
}

export function showCollectionsHtml() {
    const dashboardContent = document.getElementById('dashboardContent')
    dashboardContent.innerHTML = `
        <div class="dashboard__block">
            <h1>Your movie <span>Collections</span></h1>
            <div class="dashboard__rightBtns">
                <button id="newCollectionBtn">New collection</button>
            </div>
        </div>
        <div class="dashboard__botBtns">
            <button id="movies">Your movies</button>
            <button id="collections">Collections</button>
            <button id="search">Search</button>
        </div>
        <ul class="collections-list" id="collectionsList"><div class="loader"></div></ul>
        <button class="fixBtn"id="getMovie">GET A MOVIE</button>`
}

export function addToCollectionHtml() {
    modal.innerHTML = `
    <div>
        <h2>Add to collection</h2>
        <ul class="collections-list2" id="collectionsList2"><div class="loader"></div></ul>
    </div>`
}

export function newCollectionHtml() {
    return `
    <form class="new-collection" id="newCollectionForm">
        <div>
            <h2>New collection</h2>
            <p>Enter the name of collection</p>
            <input id="new_coll_name" placeholder="Sad films">
        </div>
        <div class="new-collection__btnCont"><button type="submit">Add</button></div>
    </form>`
}

export function renderCollectionHtml(data, ind, b=`<div id="delete_${data}_button" data-index="${data}" data-type="delete">🗑</div>`, c = 'data-type="gen-collection"') {
    return `<li data-index="${data}" ${c} class="collection-el"><span>${data}</span>${b}</li>`
}

export function sidebarProfileHtml(login) {
    return `
    <div class="sidebar__close" id="sidebarClose"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/OOjs_UI_icon_close-ltr-progressive.svg/768px-OOjs_UI_icon_close-ltr-progressive.svg.png"></div>
    <img src="https://qrjaecpccsfknzbpdwkw.supabase.co/storage/v1/object/sign/images/free-icon-user-account-12311784.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZnJlZS1pY29uLXVzZXItYWNjb3VudC0xMjMxMTc4NC5wbmciLCJpYXQiOjE3NDA5MTQ3NjksImV4cCI6ODY1NzQwODI4MzY5fQ.kFpGT0zzNqOHuyme8aku0PR9R8UgbvzfAF7NmXAzSAE" class="sidebar__profileImg" >
    <p class="sidebar__nickname" id="sidebar_nickname">${login}</p>
    <div class="sidebar__buttons">
        <button id="editBtn">EDIT PROFILE</button>   
        <button id="logoutBtn">LOG OUT</button>
    </div>
    `   
}

export function editRenderhtml() {
    movieCardModal.innerHTML = `
    <form class="editProfileForm">
        <h2>Edit profile</h2>
        <p>Enter new username</p>
        <input id="new_login">
        <button type="submit" id="edit_login_button">Submit</button>
    </form>`
}

export function renderMovieCardModalHtml(element, ind) {
    let releaseDate
    if (element.first_air_date != undefined) {
        releaseDate = element.first_air_date
    }
    else if (element.release_date != undefined) {
        releaseDate = element.release_date
    }

    let title

    if (element.name != undefined) {
        title = element.name
    }
    else if (element.title !=  undefined) {
        title = element.title
    }

    // if (title.length > 30) {
    //     title = `${title.slice(0, 30)}...`
    // }

    let overview = element.overview
    const url = consts.BACKEND_URL+'/api/films/get-poster-by-url'; // Замените на ваш URL FastAPI сервера
    const params = new URLSearchParams({
        "url": element.poster_path,
    });

    const urlWithParams = `${url}?${params}`; // Добавляем параметры к URL
    
    movieCardModal.innerHTML = `
        <div class="movies-element__img" style="background-image: url('${urlWithParams}');"></div>
            <div class="movies-element__block">
                <span>${title}</span>
                <span>${releaseDate}</span>
            </div>
            <p class="movies-element__description">${overview}</p>
            <div class="movies-element__bottom">
        </div>
        <div class="modalButtonsCont">
            <button id="addToDashboard">Add to dashboard</button>
        </div>`
}

export function renderCollectionCardHtml(name) {
    modal.innerHTML = `
    <div>
        <h2>${name}</h2>
        <ul id="modalMoviesList"><div class="loader"></div></ul>
    </div>`
}

export function renderPhotoHtml() {
    modal.innerHTML = `
    <form class="findPhotoForm" id="findByPhotoForm">
        <div>
            <h2>Find by photo</h2>
            <p>Paste your photo</p>
            <input id="image_input" type="file" accept="image/*" required>
            <p id="res"></p>
            <div id="loader2" class="loader"></div>
        </div>
        <button type="submit">Find</button>
    </form>
    `
}

export function renderDescHtml() {
    modal.innerHTML = `
    <form class="findDescForm" id="findByDescForm">
        <div>
            <h2>Find by description</h2>
            <p>Paste your description</p>
            <textarea id="input_desc" required></textarea>
            <p id="res"></p>
        </div>
        <button type="submit">Find</button>
    </form>
    `
}

export function searchPageHtml() {
    const dashboardContent = document.getElementById('dashboardContent')
    dashboardContent.innerHTML = `
        <div class="dashboard__block">
            <h1>Search in <span>global</span></h1>
            <div class="dashboard__rightBtns">
                <button id="findPhotoBtn">find by photo</button>
                <button id="findDescBtn">Find by description</button>
            </div>
        </div>
        <div class="dashboard__botBtns">
            <button id="movies">Your movies</button>
            <button id="collections">Collections</button>
            <button id="search">Search</button>
        </div>
            <form class="dashboard__search" id="searchInGlobalForm"><input id="search_in_all" placeholder="Find movie in global"></form>
        <div class="movies-block">
            <ul class="movies-search-list" id="moviesList">
            <div id="loader" class="loader"></div></ul>
            <form id="filtesForm" class="filter-form">
                    <div class="range-slider">
                        <input id="year3" type="range" min="1900" max="2030" value="1900" id="range-min">
                        <input id="year4" type="range" min="1900" max="2030" value="2030" id="range-max">
                    </div>
                    <div class="filter-form__years"><input value="1900" id="year1"><input id="year2" value="2030"></div>
                    <div class="filter-form__block">
                        <span>Genre:</span>
                        <select class="select">
                            <option>Any</option>
                            <option>Action</option>
                            <option>Adventure</option>
                            <option>Animation</option>
                            <option>Comedy</option>
                            <option>Crime</option>
                            <option>Documentary</option>
                            <option>Drama</option>
                            <option>Family</option>
                            <option>Fantasy</option>
                            <option>History</option>
                            <option>Horror</option>
                            <option>Music</option>
                            <option>Mystery</option>
                            <option>Romance</option>
                            <option>Science Fiction</option>
                            <option>TV Movie</option>
                            <option>Thriller</option>
                            <option>War</option>
                            <option>Western</option>
                            <option>Talk</option>
                        </select>
                    </div>
                    <div class="filter-form__checkbox"><input type="checkbox" checked><span>Watched</span></div>
                    <div class="filter-form__checkbox"><input type="checkbox" checked><span>Unwatched</span></div>
                    <button id="apply_filters_global">Apply filters</button>
                </form>
        </div>`  
}

export function renderAddMovieHtml() {
    modal.innerHTML = `
    <div modal__top>
        <h2 class="modal__title">Add movie</h2>
        <form class="modal__search" id="moviesForm">
            <input placeholder="Find in base" id="search__input">
            <button type="submit">Search</button>
        </form>
        <ul class="modal__filmsList" id="modalMoviesList">
            <h2>Find the movie you want to watch</h2>
        </ul>
    </div>
    <div class="modal__btn-container">
        <button>Find by photo</button>
        <span>Or</span>
        <button id="addOwn">Add your own</button>
    </div>`
}

export function getMovieHtml() {
    modal.innerHTML = `
    <div class="get-movie-top">
        <h2>Get a movie</h2>
        <p>Choose the mood of the movie</p>
        <select id="mood">
            <option>Any</option>
            <option>Joyful</option>
            <option>Serious</option>
            <option>Tense</option>
        </select>
    </div>
    <button class="get-a-movie-modal" id="getMovieModal">Get a movie</button>`
}

export function renderGetMovieEndHtml(element) {
    console.log(element)
    let releaseDate
    if (element.first_air_date != undefined) {
        releaseDate = element.first_air_date
    }
    else if (element.release_date != undefined) {
        releaseDate = element.release_date
    }

    let title

    if (element.name != undefined) {
        title = element.name
    }
    else if (element.title !=  undefined) {
        title = element.title
    }

    if (title.length > 30) {
        title = `${title.slice(0, 30)}...`
    }

    let overview = element.overview
    if (overview.length > 140) {
        overview = `${overview.slice(0, 140)}...`
    }
    const url = consts.BACKEND_URL+'/api/films/get-poster-by-url'; // Замените на ваш URL FastAPI сервера
    const params = new URLSearchParams({
        "url": element.poster_path,
    });

    const urlWithParams = `${url}?${params}`; // Добавляем параметры к URL

    return `            
    <ul class="get-movie">
        <li class="movies-element">
            <div class="movies-element__img" style="background-image: url('${urlWithParams}');"></div>
            <div class="movies-element__block">
                <span>${title}</span>
                <span>${releaseDate}</span>
            </div>
            <p class="movies-element__description">${overview}</p>
        </li>
        <div class="btn-cont">
            <button id="ok_movie">OK</button>
            <button id="another_movie">Get another</button>
        </div>
    </ul>
    `
}

export function renderModalMoviesHtml(element, ind) {

    let releaseDate
    if (element.first_air_date != undefined) {
        releaseDate = element.first_air_date
    }
    else if (element.release_date != undefined) {
        releaseDate = element.release_date
    }

    let title

    if (element.name != undefined) {
        title = element.name
    }
    else if (element.title !=  undefined) {
        title = element.title
    }

    if (title.length > 30) {
        title = `${title.slice(0, 30)}...`
    }

    let overview = element.overview
    if (overview.length > 100) {
        overview = `${overview.slice(0, 100)}...`
    }
    const url = consts.BACKEND_URL+'/api/films/get-poster-by-url'; // Замените на ваш URL FastAPI сервера
    const params = new URLSearchParams({
        "url": element.poster_path,
    });

    const urlWithParams = `${url}?${params}`; // Добавляем параметры к URL
    return `
    <li class="modal-movie-element" data-index="${ind}" data-type="movie">
        <img src="${urlWithParams}" data-index="${ind}" data-type="movie">
        <div data-index="${ind}" data-type="movie">
            <div class="modal-movie-element__container" data-index="${ind}" data-type="movie">
                <span data-index="${ind}" data-type="movie">${title}</span>
                <span data-index="${ind}" data-type="movie">${releaseDate}</span>
            </div>
            <p data-index="${ind}" data-type="movie">${overview}</p>
        </div>
    </li>`
}

export function addOwnHtml() {
    return `
    <form class="addOwnForm" id="addOwnForm">
        <div>
            <h2>Add your own movie</h2>
            <p>Specify the name of the movie</p>
            <input id="title_input" required placeholder="Interstellar">
            <p>Specify the release year of the movie</p>
            <input id="date_input" type="date" placeholder="1999-01-01">
            <p>Specify a description of the movie</p>
            <textarea id="description_input" required placeholder="Description"></textarea>
        </div>
        <button type="submit">Add</button>
    </form>`
}