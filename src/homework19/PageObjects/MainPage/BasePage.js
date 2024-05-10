import Header from "../MainPage/Header.js";
import Main from "../MainPage/Main.js";
import NavBar from "./NavBar.js";

export default class BasePage {
    constructor(page, url) {
        this._page = page;
        this._url = url;
        this.header = new Header(page);
        this.main = new Main(page);
        this.navBar = new NavBar(page);
    }

    get page (){
        return this._page
    }

    async navigate(){
        await this._page.goto(this._url)
    }
}