import {SauceCheckoutStepOnePage} from "./sauceCheckoutStepOnePage";
import {SauceBasePage} from "./sauceBasePage";

export class SauceCartPage extends SauceBasePage {

    constructor() {
        super();
        this.path = 'https://www.saucedemo.com/cart.html/';
    }

    checkout(): SauceCheckoutStepOnePage {
        browser.$('.checkout_button').click();
        return new SauceCheckoutStepOnePage();
    }

    getAllCartItems(): WebdriverIO.ElementArray {
        return browser.$$('.cart_item');
    }

    getCartItemNum(itemNum: number): WebdriverIO.Element {
        return this.getAllCartItems()[itemNum - 1];
    }

    getItemPrice(element: WebdriverIO.Element): number {
        return Number(element.$('.inventory_item_price').getText);
    }

    getItemRemoveButton(element: WebdriverIO.Element): WebdriverIO.Element {
        return element.$('.item_pricebar button');
    }

    open(): void {
        (super.open(this.path))
    }
}
