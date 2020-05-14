import {BasePage} from "../../basePage";
import workFlowsDashboardPage from "../trayWorkFlowsDashboardPage";

export default class TrayDeleteWorkflowModal extends BasePage {

    constructor() {
        super();
        this.path = 'https://app.tray.io';
    }

    confirmDeletion(): workFlowsDashboardPage {
        browser.waitUntil(() => this.getDeleteWorkflowModal().isDisplayed());
        browser.waitUntil(() => this.getConfirmationField().isClickable());
        this.getConfirmationField().click();
        this.getConfirmationField().setValue('DELETE');
        this.getDeleteButton().click();
        browser.waitUntil(
            () => !this.getDeleteWorkflowModal().isDisplayed(),
            {
                timeout: 10000,
                timeoutMsg: 'Remove Workflow Modal did not vanish within 10 seconds'
            }
        );
        return new workFlowsDashboardPage();
    }

    getConfirmationField(): WebdriverIO.Element {
        return browser.$("input[qa='confirm-workflow-deletion-input']")
    }

    getDeleteButton(): WebdriverIO.Element {
        return browser.$("button[data-qa='delete-workflows-submit']")
    }

    getDeleteWorkflowModal(): WebdriverIO.Element {
        return browser.$("div[data-qa='remove-workflow-modal']")
    }

}
