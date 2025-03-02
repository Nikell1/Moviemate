export function dashboardHtml() {
    wrapper.innerHTML = `
    <div class="dashboard">
        <nav class="dashboard__nav">
            <span class="logo">NAME</span>
            <button id="profileBtn" class="dashboard__profile">
                <div></div>
                <span>Nickname</span>
            </button>
        </nav> 
        <div id="dashboardContent">
        </div>
    </div>
    <div class="sidebar" id="sidebar"></div>
    <div class="dark" id="dark"></div>`
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
                    <button class="movies-element__btn1">Mark as watched</button>
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
                <button>Add movie</button>
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

export function sidebarProfileHtml() {
    return `
    <div class="sidebar__close" id="sidebarClose"></div>
    <div class="sidebar__profileImg"></div>
    <p class="sidebar__nickname">Nickname</p>
    <div class="sidebar__buttons">
        <button>EDIT PROFILE</button>   
        <button>LOG OUT</button>
    </div>
    `
}