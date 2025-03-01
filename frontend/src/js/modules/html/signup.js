export function signupHtml() {
    wrapper.innerHTML = `
    <div class="login">
        <form class="login__form" id="signForm">
            <h2>Sign up your account</h2>
            <div class="login__input-group">
                <label for="login">Enter your email</label>
                <input type="text" placeholder="email" required>
            </div>
            <div class="login__input-group">
                <label for="login">Enter your username</label>
                <input type="text" placeholder="username" required>
            </div>
            <div class="login__input-group">
                <label for="password">Enter your password</label>
                <input type="password" placeholder="password" required>
            </div>
            <p id="message"></p>
            <button type="submit" class="login__button" id="submitBtn">Sign up</button>
            <p class="message">Already have an account <button type="reset" id="signupBtn1">log in</button></p>
        </form>
    </div>
    <button class="login__close" id="close"></button>
    `
}