import BaseComponent from "./BaseComponent";

export default class Main extends BaseComponent {
    constructor(page) {
        super(page, page.locator('main'));
        this.signUpButton =  page.locator('button', {hasText: 'Sign up'})
    }
}
