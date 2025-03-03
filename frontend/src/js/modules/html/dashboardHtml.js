export function dashboardHtml() {
    wrapper.innerHTML = `
    <div class="dashboard">
        <nav class="dashboard__nav">
            <span class="logo">MOVIEMATE</span>
            <button id="profileBtn" class="dashboard__profile">
                <img src="https://qrjaecpccsfknzbpdwkw.supabase.co/storage/v1/object/sign/images/free-icon-user-account-12311784.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZnJlZS1pY29uLXVzZXItYWNjb3VudC0xMjMxMTc4NC5wbmciLCJpYXQiOjE3NDA5MTQ3NjksImV4cCI6ODY1NzQwODI4MzY5fQ.kFpGT0zzNqOHuyme8aku0PR9R8UgbvzfAF7NmXAzSAE">
                <span id="profile_nickname">Nickname</span>
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

export function renderMoviesHtml(element) {
    const url = 'http://localhost:8000/api/films/get-poster-by-url'; // Замените на ваш URL FastAPI сервера
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
                <div class="movies-element__img" style="background-image: url('${urlWithParams}');"></div>
                <div class="movies-element__block">
                    <span>${title}</span>
                    <span>${element.release_date}</span>
                </div>
                <p class="movies-element__description">${overview}</p>
                <div class="movies-element__bottom">
                    <button class="movies-element__btn1" id="mark_${element.id}">${element.watched}</button>
                    <button class="movies-element__btn2" id="add_to_coll_${element.id}">Add to collection</button>
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
                <button>New collection</button>
            </div>
        </div>
        <div class="dashboard__botBtns">
            <button id="movies">Your movies</button>
            <button id="collections">Collections</button>
            <button id="friends">Friends</button>
            <button id="search">Search</button>
        </div>
        <form id="searchInMoviesForm" class="dashboard__search"><input id="search_in_bookmarks" placeholder="Find movie in your bookmarks"></form>
        <ul class="movies-list" id="moviesList"></ul>
        <button class="fixBtn" id="getMovie">GET A MOVIE</button>`
}

export function showCollectionsHtml() {
    const dashboardContent = document.getElementById('dashboardContent')
    dashboardContent.innerHTML = `
        <div class="dashboard__block">
            <h1>Your movie <span>Collections</span></h1>
            <div class="dashboard__rightBtns">
                <button>New collection</button>
            </div>
        </div>
        <div class="dashboard__botBtns">
            <button id="movies">Your movies</button>
            <button id="collections">Collections</button>
            <button id="friends">Friends</button>
            <button id="search">Search</button>
        </div>
        <ul class="collections-list" id="collectionsList">
        </ul>
        <button class="fixBtn"id="getMovie">GET A MOVIE</button>`
}

export function renderCollectionHtml(data, ind) {
    return `<li data-index="${ind}" data-type="collection" class="collection-el"><span>title</span><div data-index="${ind}" data-type="delete">🗑</div></li>`
}

export function sidebarProfileHtml(login) {
    return `
    <div class="sidebar__close" id="sidebarClose"></div>
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
    const url = 'http://localhost:8000/api/films/get-poster-by-url'; // Замените на ваш URL FastAPI сервера
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
            <button>Add to collection</button>
        </div>`
}

export function searchPageHtml() {
    const dashboardContent = document.getElementById('dashboardContent')
    dashboardContent.innerHTML = `
        <div class="dashboard__block">
            <h1>Search in <span>global</span></h1>
        </div>
        <div class="dashboard__botBtns">
            <button id="movies">Your movies</button>
            <button id="collections">Collections</button>
            <button id="friends">Friends</button>
            <button id="search">Search</button>
        </div>
        <form class="dashboard__search" id="searchInGlobalForm"><input placeholder="Find movie in global"></form>
        <ul class="movies-list" id="moviesList"></ul>`  
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
    const url = 'http://localhost:8000/api/films/get-poster-by-url'; // Замените на ваш URL FastAPI сервера
    const params = new URLSearchParams({
        "url": element.poster_path,
    });

    const urlWithParams = `${url}?${params}`; // Добавляем параметры к URL

    return `            
    <li class="movies-element">
        <div class="movies-element__img" style="background-image: url('${urlWithParams}');"></div>
        <div class="movies-element__block">
            <span>${title}</span>
            <span>${releaseDate}</span> 
        </div>
        <p class="movies-element__description">${overview}</p>
    </li>
    <button id="ok_movie">OK</button>
    <button id="another_movie">Get another</button>
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
    const url = 'http://localhost:8000/api/films/get-poster-by-url'; // Замените на ваш URL FastAPI сервера
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
            <input id="date_input" required placeholder="01-01-1999">
            <p>Specify a description of the movie</p>
            <textarea id="description_input" required placeholder="Description"></textarea>
        </div>
        <button type="submit">Add</button>
    </form>`
}