import {SauceBasePage} from "./sauceBasePage";

export class SauceInventoryPage extends SauceBasePage {

    constructor() {
        super();
        this.path = 'https://www.saucedemo.com/inventory.html/';
    }

    addItemToCart(itemNum: number): void {
        this.getItemAddButton(this.getItem(itemNum)).click();
    }

    getAllItems(): WebdriverIO.ElementArray {
        return browser.$$('.inventory_item')
    }

    getItem(itemNum: number): WebdriverIO.Element {
        return this.getAllItems()[itemNum - 1];
    }

    getItemAddButton(item: WebdriverIO.Element): WebdriverIO.Element {
        return item.$('button');
    }

    getSortingDropdown(): WebdriverIO.Element {
        return browser.$('.product_sort_container');
    }

    getVisiblePrices(): Array<string> {
        return browser.$$('.inventory_item_price').map(element => {
            return element.getText();
        })
    }

    open(): void {
        (super.open(this.path))
    }

    sortBy(sortType: string): void {
        this.getSortingDropdown().selectByVisibleText(sortType);
    }

}
