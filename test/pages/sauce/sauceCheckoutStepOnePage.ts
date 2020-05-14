import {SauceBasePage} from "./sauceBasePage";

export class SauceCheckoutStepOnePage extends SauceBasePage {

    constructor() {
        super();
        this.path = 'https://www.saucedemo.com/checkout-step-one.html/';
    }

    getCancelButton(): WebdriverIO.Element {
        return browser.$('a.cart_cancel_link');
    }

    getContinueButton(): WebdriverIO.Element {
        return browser.$('input.cart_button');
    }

    getFirstNameField(): WebdriverIO.Element {
        return browser.$('input#first-name');
    }

    getLastNameField(): WebdriverIO.Element {
        return browser.$('input#last-name');
    }

    getZipPostCodeField(): WebdriverIO.Element {
        return browser.$('input#postal-code');
    }

    open(): void {
        (super.open(this.path))
    }

}
