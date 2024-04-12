import RegistrationComponent from "../Registration/RegistrationComponent.js";

export default class MainPage {
    constructor(page) {
        this._page = page;
        this._signupButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
    }
    
    async navigate() {
        await this._page.goto("");
    }
    
    async openRegistrationComponent() {
        await this._signupButton.click();
        return new RegistrationComponent(this._page);
    }
}
