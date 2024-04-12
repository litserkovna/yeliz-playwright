export default class RegistrationComponent {
    _nameInputSelector = '#signupName';
    _lastNameInputSelector = '#signupLastName';
    _emailInputSelector = '#signupEmail';
    _passwordInputSelector = '#signupPassword';
    _repeatPasswordInputSelector = '#signupRepeatPassword';
    _ErrorMessage = '.invalid-feedback';
    _registerButton = '.btn-primary';
    _secondPasswordInput = '#signupRepeatPassword';

    constructor(page){ 
        this._page = page;
        this.container = page.locator('app-signup-modal')
        
        this.nameInput = this.container.locator(this._nameInputSelector)
        this.nameErrorMessage = this.container.locator(`${this._nameInputSelector} + ${this._ErrorMessage}`)

        this.lastNameInput = this.container.locator(this._lastNameInputSelector)
        this.lastNameErrorMessage = this.container.locator(`${this._lastNameInputSelector} + ${this._ErrorMessage}`)

        this.emailInput = this.container.locator(this._emailInputSelector)
        this.emailErrorMessage = this.container.locator(`${this._emailInputSelector} + ${this._ErrorMessage}`)

        this.passwordInput = this.container.locator(this._passwordInputSelector)
        this.passwordErrorMessage = this.container.locator(`${this._passwordInputSelector} + ${this._ErrorMessage}`)

        this.repeatPasswordInput = this.container.locator(this._repeatPasswordInputSelector)
        this.repeatPasswordErrorMessage = this.container.locator(`${this._repeatPasswordInputSelector} + ${this._ErrorMessage}`)

        this.secondPasswordInput = this.container.locator(this._secondPasswordInput)
        this.secondPasswordErrorMessage = this.container.locator(`${this._secondPasswordInput} + ${this._ErrorMessage}`)
        

        this.registerButton = this.container.locator(this._registerButton)
    }
}

   
