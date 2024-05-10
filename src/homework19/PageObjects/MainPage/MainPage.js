import RegistrationPopup from "../Registration/RegistrationPopup.js";
import BasePage from "./BasePage.js";
import SignInPopup from "../SignIn/SignInPopup.js";

class MainPage extends BasePage {
    constructor(page) {
        super(page, "")
        this._signupButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
        this._signInButton = page.getByText('Sign In')
    }

    async openSignInPopup(){
        await this._signInButton.click();
        return new SignInPopup(this._page);
    }
    async navigate() {
        await super.navigate("");
    }

        async openRegistrationPopup() {
        await this._signupButton.click();
        return new RegistrationPopup(this._page);
    }
}

export default MainPage;