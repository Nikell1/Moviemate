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
                <div class="movies-element__img"></div>
                <div class="movies-element__block">
                    <span>Name of film</span>
                    <span>1990</span>
                </div>
                <p class="movies-element__description">Description</p>
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