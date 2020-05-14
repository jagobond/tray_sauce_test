import {BasePage} from "../../basePage";
import workFlowPage from "../trayWorkFlowEditorPage";

export default class TrayAddATriggerModal extends BasePage {

    constructor() {
        super();
        this.path = 'https://app.tray.io/create';
    }

    clickConnectionTriggerNamed(triggerName: string): workFlowPage {
        this.getConnectionTriggerNamed(triggerName).click();
        browser.waitUntil(
            () => $("div[data-qa='workflow-canvas-container']").isDisplayed(),
        ),
            {
                timeout: 10000,
                timeoutMsg: 'Workflow Edit Page did not appear within 10 seconds'
            };
        return new workFlowPage();
    }

    getAllConnectorTiles(): WebdriverIO.ElementArray {
        return browser.$$("div[data-qa='Trigger-selection-box']>div>div");
    }

    getConnectionTriggerNamed(triggerName: string): WebdriverIO.Element {
        console.log('Looking for trigger named: ' + triggerName);
        return this.getAllConnectorTiles().find(connector => {
            console.log('found a trigger: ' + connector.getText());
            return connector.getText().toLowerCase().includes(triggerName.toLowerCase());
        })
    }

}
