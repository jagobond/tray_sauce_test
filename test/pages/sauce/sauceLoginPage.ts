import {SauceInventoryPage} from "./sauceInventoryPage";
import {SauceBasePage} from "./sauceBasePage";

export class SauceLoginPage extends SauceBasePage {

    constructor() {
        super();
        this.path = 'https://www.saucedemo.com/';
    }

    getLoginButton(): WebdriverIO.Element {
        return browser.$('.btn_action');
    }

    getPasswordField(): WebdriverIO.Element {
        return browser.$('#password');
    }

    getUsernameField(): WebdriverIO.Element {
        return browser.$('#user-name');
    }

    login(username: string, password: string): SauceInventoryPage {
        this.getUsernameField().setValue(username);
        this.getPasswordField().setValue(password);
        this.getLoginButton().click();
        return new SauceInventoryPage();
    }

    open(): void {
        (super.open(this.path))
    }

}
