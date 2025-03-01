export function loginHtml() {
    wrapper.innerHTML = `
    <div class="login">
        <form class="login__form" id="signForm">
            <h2>Log in to your account</h2>
            <div class="login__input-group">
                <label for="login">Enter email or username</label>
                <input type="text" id="login" placeholder="username/email" required>
            </div>
            <div class="login__input-group">
                <label for="password">Enter your password</label>
                <input type="password" id="password" placeholder="password" required>
            </div>
            <p id="message"></p>
            <button type="submit" class="login__button" id="submitBtn">Log in</button>
            <p class="message">New to our website? <button type="reset" id="signupBtn1">sign up</button></p>
        </form>
    </div>
    <button class="login__close" id="close"></button>
    `
}