export class BasePage {

    path;

    constructor() {
    }

    getTitle(): string {
        return browser.getTitle();
    }

    getUrl(): string {
        return browser.getUrl();
    }

    open(path) {
        browser.url(path);
    }

}
