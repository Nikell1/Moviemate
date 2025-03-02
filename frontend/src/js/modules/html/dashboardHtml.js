export function dashboardHtml() {
    wrapper.innerHTML = `
    <div class="dashboard">
        <nav class="dashboard__nav">
            <span class="logo">NAME</span>
            <button id="profileBtn" class="dashboard__profile">
                <img src="https://qrjaecpccsfknzbpdwkw.supabase.co/storage/v1/object/sign/images/free-icon-user-account-12311784.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZnJlZS1pY29uLXVzZXItYWNjb3VudC0xMjMxMTc4NC5wbmciLCJpYXQiOjE3NDA5MTQ3NjksImV4cCI6ODY1NzQwODI4MzY5fQ.kFpGT0zzNqOHuyme8aku0PR9R8UgbvzfAF7NmXAzSAE">
                <span id="profile_nickname">Nickname</span>
            </button>
        </nav> 
        <div id="dashboardContent">
        </div>
    </div>
    <div class="sidebar" id="sidebar"></div>
    <div class="dark" id="dark"></div>
    <div class="modal" id="modal"></div>`
}

export function renderMoviesHtml(element) {
    return `            
            <li class="movies-element">
                <div class="movies-element__img" style="background-image: url('${element.poster_path}');"></div>
                <div class="movies-element__block">
                    <span>${element.title}</span>
                    <span>${element.release_date}</span>
                </div>
                <p class="movies-element__description">${element.overview}</p>
                <div class="movies-element__bottom">
                    <button class="movies-element__btn1">${element.watched}</button>
                    <button class="movies-element__btn2">Add to collection</button>
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
        <input class="dashboard__search" placeholder="Find movie in your bookmarks">
        <ul class="movies-list" id="moviesList"></ul>
        <button class="fixBtn">GET A MOVIE</button>`
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
        <ul class="movies-list" id="moviesList"></ul>
        <button class="fixBtn">GET A MOVIE</button>`
}

export function sidebarProfileHtml(login) {
    return `
    <div class="sidebar__close" id="sidebarClose"></div>
    <img src="https://qrjaecpccsfknzbpdwkw.supabase.co/storage/v1/object/sign/images/free-icon-user-account-12311784.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZnJlZS1pY29uLXVzZXItYWNjb3VudC0xMjMxMTc4NC5wbmciLCJpYXQiOjE3NDA5MTQ3NjksImV4cCI6ODY1NzQwODI4MzY5fQ.kFpGT0zzNqOHuyme8aku0PR9R8UgbvzfAF7NmXAzSAE" class="sidebar__profileImg" >
    <p class="sidebar__nickname" id="sidebar_nickname">${login}</p>
    <div class="sidebar__buttons">
        <button>EDIT PROFILE</button>   
        <button>LOG OUT</button>
    </div>
    `   
}

export function renderAddMovieHtml() {
    modal.innerHTML = `
    <div modal__top>
        <h2 class="modal__title">Add movie</h2>
        <form class="modal__search" id="moviesForm">
            <input placeholder="FInd in base">
            <button type="submit">Search</button>
        </form>
        <ul class="modal__filmsList">${renderModalMoviesHtml()}</ul>
    </div>
    <div class="modal__btn-container">
        <button>Find by photo</button>
        <span>Or</span>
        <button>Create your own</button>
    </div>`
}

export function renderModalMoviesHtml() {
    return `
    <li class="modal-movie-element">
        <img src="">
        <div>
            <div class="modal-movie-element__container">
                <span>Name of film</span>
                <span>1990</span>
            </div>
            <p>Description</p>
        </div>
    </li>`
}