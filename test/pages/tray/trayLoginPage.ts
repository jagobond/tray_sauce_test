import {BasePage} from "../basePage";
import workFlowsDashboardPage from "./trayWorkFlowsDashboardPage";

export default class TrayLoginPage extends BasePage {

    constructor() {
        super();
        this.path = 'https://app.tray.io/login';
    }

    getLoginButton(): WebdriverIO.Element {
        return browser.$('button');
    }

    getPasswordField(): WebdriverIO.Element {
        return browser.$('input[name="password"]');
    }

    getUsernameField(): WebdriverIO.Element {
        return browser.$('input[name="username"]');
    }

    login(username: string, password: string): workFlowsDashboardPage {
        this.getUsernameField().setValue(username);
        this.getPasswordField().setValue(password);
        this.getLoginButton().click();
        browser.waitUntil(
            () => !this.getUsernameField().isDisplayed()
        ), {
            timeout: 220000,
            timeoutMsg: 'Timed out waiting for the Dashboard to load',
            interval: 10000
        };
        return new workFlowsDashboardPage();
    }

    open(): void {
        (super.open(this.path))
    }

}
