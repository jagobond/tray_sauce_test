import {BasePage} from "../../basePage";
import addATriggerModal from "./trayAddATriggerModal";

export default class TrayNewWorkflowModal extends BasePage {


    constructor() {
        super();
        this.path = 'https://app.tray.io/create';
    }

    getCancelNewWorkflowButton(): WebdriverIO.Element {
        return browser.$("button:nth-child(1)>span");
    }

    createNewWorkflowWithName(workflowName: string): addATriggerModal {
        this.getNewWorkflowNameField().setValue(workflowName);
        this.getCreateWorkflowButton().click();
        browser.waitUntil(
            () => $$("div[data-qa='Trigger-selection-box']>div>div").length > 40,
            {
                timeout: 10000,
                timeoutMsg: 'Timed out waiting for the Add Trigger Modal to load'
            }
        );
        return new addATriggerModal();
    }

    getCreateWorkflowButton(): WebdriverIO.Element {
        return browser.$("button[data-qa='create-workflow-confirm']");
    }

    getNewWorkflowNameField(): WebdriverIO.Element {
        return browser.$("input[qa='new-workflow-name-input']");
    }

}
