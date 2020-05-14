import {BasePage} from "../basePage";
import newWorkflowModal from "./modals/trayNewWorkflowModal";
import deleteWorkflowModal from "./modals/trayDeleteWorkflowModal";
import TrayLoginPage from "./trayLoginPage";

export default class TrayWorkFlowsDashboardPage extends BasePage {

    constructor() {
        super();
        this.path = 'https://app.tray.io';
    }

    beginNewWorkflow(): newWorkflowModal {
        this.getCreateNewWorkflowButton().click();
        browser.waitUntil(
            () => $("div[data-qa='create-workflow-modal']").isDisplayed(),
            {
                timeout: 10000,
                timeoutMsg: 'Create Workflow Modal did not appear within 10 seconds'
            }
        );
        return new newWorkflowModal();
    }

    deleteWorkflowNamed(workflowName: string): deleteWorkflowModal {
        let deleteWorkflow = this.getWorkFlowNamed(workflowName);
        let options = this.getOptionsMenuForWorkFlow(deleteWorkflow);
        options.click();
        this.getOptionInMenuNamed("delete").click();
        browser.waitUntil(
            () => $("div[data-qa='remove-workflow-modal']").isDisplayed(),
            {
                timeout: 10000,
                timeoutMsg: 'Remove Workflow Modal did not appear within 10 seconds'
            }
        );
        return new deleteWorkflowModal();
    }

    getAllWorkFlows(): WebdriverIO.ElementArray {
        return browser.$$("div.WorkflowsList>ul>li");
    }

    getCreateNewWorkflowButton(): WebdriverIO.Element {
        return browser.$('div.ButtonGroup___3ksKkT a');
    }

    getOptionsInAvatarMenu(): WebdriverIO.ElementArray {
        browser.waitUntil(
            () => $$("li[data-qa='list-item-non-active']")[0].isDisplayed(), {}
        );

        return browser.$$("li[data-qa='list-item-non-active']")
    }

    getOptionInAvatarMenuNamed(optionName: string): WebdriverIO.Element {
        return this.getOptionsInAvatarMenu().find(item => {
            return item.getText().toLowerCase().trim() === optionName.toLowerCase().trim();
        })
    }

    getOptionsMenuForWorkFlow(workflow: WebdriverIO.Element): WebdriverIO.Element {
        return workflow.$("div>svg")
    }

    getOptionInMenuNamed(optionName: string): WebdriverIO.Element {
        return browser.$$("div#portal-undefined ul>li").find(option => {
                return option.getText().toLowerCase() === optionName.toLowerCase();
            }
        );
    }

    getUserIcon(): WebdriverIO.Element {
        return browser.$("img[data-qa='avatar-img']");
    }

    getWorkFlowNamed(workflowName: string): WebdriverIO.Element {
        return this.getAllWorkFlows().find(workflow => {
            return workflow.$('h5').getText().toLowerCase().trim() === workflowName.toLowerCase().trim();
        })
    }

    logout(): TrayLoginPage {
        this.getUserIcon().click();
        this.getOptionInAvatarMenuNamed('logout').click();
        return new TrayLoginPage();
    }

}
