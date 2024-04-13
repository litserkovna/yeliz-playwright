import RegistrationPopup from "../Registration/RegistrationPopup.js";
import BasePage from "./BasePage.js";


export default class MainPage extends BasePage {
    constructor(page) {
        this._page = page;
        this._signupButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
    }
    
    async navigate() {
        await this._page.goto("");
    }
    
    async openRegistrationPopup() {
        await this._signupButton.click();
        return new RegistrationPopup(this._page);
    }
}
