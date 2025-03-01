export function homeHtml() {
    wrapper.innerHTML = `
            <header class="header">
            <nav class="header__nav">
                <span>NAME</span>
                <div class="header__signBtn">
                    <button id="signupBtn1">SIGN UP</button>
                    <button id="loginBtn">LOG IN</buttons>
                </div>
            </nav>
            <div class="header__anchor">
                <h1><span class="blue-col">All</span> your thoughts about 
                    <span class="blue-col">movies</span> are in one app</h1>
                <button class="header__mainBtn" id="signupBtn2">GET STARTED</button>
            </div>
        </header>`
}