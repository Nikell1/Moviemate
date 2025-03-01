export function dashboardHtml() {
    wrapper.innerHTML = `
    <div class="dashboard">
        <nav class="dashboard__nav">
            <span>NAME</span>
            <span>LOG OUT</span>
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
            <button>Collections</button>
            <button>Collections</button>
        </div>
        <ul class="movies-list">
            <li class="movies-element">
                <img src="" alt="Film Cover">
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
                        <li class="movies-element">
                <img src="" alt="Film Cover">
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
                        <li class="movies-element">
                <img src="" alt="Film Cover">
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
                        <li class="movies-element">
                <img src="" alt="Film Cover">
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
    </div>`
}