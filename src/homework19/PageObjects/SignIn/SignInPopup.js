import BasePage from "../MainPage/BasePage.js";

export default class SignInPopup extends BasePage {
    _emailInputSelector = '#signinEmail'
    _passwordInputSelector = '#signinPassword'

    constructor(page) {
        super(page)
        this.emailInput =  this.page.locator(this._emailInputSelector)
        this.emailInputErrorMessage =  this.page.locator(`${this._emailInputSelector} + .invalid-feedback`)

        this.passwordInput =  this.page.locator(this._passwordInputSelector)
        this.passwordInputErrorMessage =  this.page.locator(`${this._passwordInputSelector} + .invalid-feedback`)

        this.signInButton = this.page.locator('button.btn.btn-primary').getByText("Login");
    }
}