import TrayLoginPage from "../../pages/tray/trayLoginPage";

// should be stored externally in a secure location in future
let username = "secret_username";
let password = "secret_password";

let loginPage, workFlowsDashboardPage, newWorkflowModal, addTriggerModal, deleteWorkflowModal, workflowEditorPage;

describe('tray.io workflows end-to-end', () => {

    let workflowName = 'highlyNotDangerousWorkflow';

    it('should login', () => {
        loginPage = new TrayLoginPage();
        loginPage.open();
        expect(browser).toHaveTitle('tray.io | Login');
        workFlowsDashboardPage = loginPage.login(username, password);
        expect(browser).toHaveTitle('tray.io | Dashboard');
    }),

    it('should create a new workflow', () => {
        newWorkflowModal = workFlowsDashboardPage.beginNewWorkflow();
        expect(browser).toHaveTitle('tray.io | Dashboard');
        expect(browser).toHaveUrl('https://app.tray.io/create');
    }),

    it('creates a new workflow', () => {
        addTriggerModal = newWorkflowModal.createNewWorkflowWithName(workflowName);
    }),

    it('chooses a trigger', () => {
        workflowEditorPage = addTriggerModal.clickConnectionTriggerNamed('Manual Trigger');
        expect(browser).toHaveUrl('https://app.tray.io/workflow', {containing: true});
        expect(browser).toHaveUrl('edit', {containing: true});
        expect(workflowEditorPage.getWorkflowName()).toEqual(workflowName)
    }),

    it('closes the workflow editor', () => {
        workFlowsDashboardPage = workflowEditorPage.closeWorkflowEditor();
        expect(browser).toHaveTitle('tray.io | Dashboard');
        expect(browser).toHaveUrl('https://app.tray.io/');
    }),

    it('should delete the workflow', () => {
        deleteWorkflowModal = workFlowsDashboardPage.deleteWorkflowNamed(workflowName);
        workFlowsDashboardPage = deleteWorkflowModal.confirmDeletion();
        expect(browser).toHaveTitle('tray.io | Dashboard');
        expect(browser).toHaveUrl('https://app.tray.io/');
        expect(workFlowsDashboardPage.getWorkFlowNamed(workflowName)).not.toExist()
    }),

    it('should log out', () => {
        loginPage = workFlowsDashboardPage.logout();
        expect(browser).toHaveTitle('tray.io | Login');
    })

});
