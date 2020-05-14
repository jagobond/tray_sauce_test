import {BasePage} from "../basePage";
import workFlowsDashboardPage from "./trayWorkFlowsDashboardPage";

export default class TrayWorkFlowEditorPage extends BasePage {

    constructor() {
        super();
        this.path = 'https://app.tray.io/workflow';
    }

    closeWorkflowEditor(): workFlowsDashboardPage {
        this.getCloseWorkflowEditorButton().click();
        browser.waitUntil(() => $("span[data-qa='tooltip-button']>div>div").isClickable());
        return new workFlowsDashboardPage();
    }

    getCloseWorkflowEditorButton(): WebdriverIO.Element {
        return browser.$("a[data-qa='builder-close']")
    }

    getWorkflowName(): string {
        return this.getWorkflowNameField().getValue();
    }

    getWorkflowNameField(): WebdriverIO.Element {
        return browser.$("div[data-qa='workflow-switcher'] input");
    }

}
