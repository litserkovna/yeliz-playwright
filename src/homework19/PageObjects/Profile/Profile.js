import BasePage from "../MainPage/BasePage.js"

export default class ProfilePage extends BasePage {
    constructor(page) {
        super(page, "panel/profile")
        this.editProfileButton = page.getByRole('button', {text: "Edit profile"});
        this.profileName = page.locator("p.profile_name")
    }
}