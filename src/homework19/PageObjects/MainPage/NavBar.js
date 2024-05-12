import BaseComponent from "./BaseComponent";

class NavBar extends BaseComponent {
    constructor(page) {
        super(page, ".sidebar");
        this.profileButton = page.locator(".sidebar .-profile")
      }
}
export default NavBar;
