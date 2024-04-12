export default class BasePage {
    constructor(page) {
        this._page = page;
    }

    async navigateTo(url) {
        await this._page.goto(url);
    }
}