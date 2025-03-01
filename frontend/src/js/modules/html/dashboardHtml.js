export function dashboardHtml() {
    wrapper.innerHTML = `
    <div class="dashboard">
        <nav class="dashboard__nav">
            <span>NAME</span>
            <button class="dashboard__profile" id="profileBtn"></button>
        </nav> 
        <div class="dashboard__block">
            <h1>Your movie dashboard</h1>
            <div class="dashboard__rightBtns">
                <button>Add movie</button>
                <button>New collection</button>
            </div>
        </div>   
        <div class="dashboard__botBtns">
            <button>Your movies</button>
            <button>Collections</button>
            <button>Friends</button>
            <button>Search</button>
        </div>
        <ul class="movies-list" id="moviesList">
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
            </li>
        </ul>
        <button class="fixBtn">GET A MOVIE</button>
    </div>
    <div class="sidebar"></div>`
}

export function renderMoviehHtml(element) {
    return `            
    <li class="movies-element">
            <div class="movies-element__img"></div>
            <div class="movies-element__block">
                <span></span>
                <span>1990</span>
            </div>
            <p class="movies-element__description">Description</p>
            <div class="movies-element__bottom">
                <button class="movies-element__btn1">Mark as watched</button>
                <button class="movies-element__btn2">Add to collection</button>
            </div>
        </li>`
}