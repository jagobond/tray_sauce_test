import {BasePage} from "../basePage";

export class SauceBasePage extends BasePage {

    constructor() {
        super();
        this.path = 'https://www.saucedemo.com/';
    }

    getNumItemsInCart(): number {
        return Number.parseInt(this.getShoppingCartBadge().getText());
    }

    getShoppingCartBadge(): WebdriverIO.Element {
        return browser.$('.shopping_cart_badge');
    }

    goToCart(): void {
        this.getShoppingCartBadge().click();
    }

    open(path) {
        super.open(this.path);
    }

}
