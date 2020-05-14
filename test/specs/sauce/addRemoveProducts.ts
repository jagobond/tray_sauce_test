import {SauceLoginPage} from "../../pages/sauce/sauceLoginPage";
import {SauceCartPage} from "../../pages/sauce/sauceCartPage";

let username = "standard_user";
let password = "secret_sauce";

let sauceLoginPage, sauceInventoryPage, sauceCartPage, sauceCheckoutStepOnePage;

describe('SacueLabs End To End Workflow', () => {
    it('should login', () => {
        sauceLoginPage = new SauceLoginPage();
        sauceLoginPage.open();
        expect(sauceLoginPage.getTitle()).toEqual('Swag Labs');
        sauceInventoryPage = sauceLoginPage.login(username, password);
        expect(sauceLoginPage.getTitle()).toEqual('Swag Labs');
        expect(sauceLoginPage.getUrl()).toEqual('https://www.saucedemo.com/inventory.html');
    })

    it('Sorts by Price, low to high', () => {
        sauceInventoryPage.sortBy('Price (low to high)');
        let actual: number[] = sauceInventoryPage.getVisiblePrices().map(priceString => {
            return Number(priceString.replace(/[^0-9\.-]+/g, ""));
        });
        let expected: number[] = Array.from(actual).sort((n1, n2) => n1 - n2);
        expect(actual).toStrictEqual(expected);
    })

    it('Adds the two cheapest products to the cart', () => {
        sauceInventoryPage.addItemToCart(1);
        expect(sauceInventoryPage.getNumItemsInCart()).toEqual(1);
        sauceInventoryPage.addItemToCart(2);
        expect(sauceInventoryPage.getNumItemsInCart()).toEqual(2);
    })

    it('goes to the cart', () => {
        sauceInventoryPage.goToCart();
        sauceCartPage = new SauceCartPage();
        expect(sauceCartPage.getTitle()).toEqual('Swag Labs');
        expect(sauceCartPage.getUrl()).toEqual('https://www.saucedemo.com/cart.html');
    })

    it('removes the cheapest item from the cart', () => {
        expect(sauceCartPage.getAllCartItems().length).toEqual(2);
        let sortedItems = sauceCartPage.getAllCartItems().sort((n1, n2) =>
            sauceCartPage.getItemPrice(n1) - sauceCartPage.getItemPrice(n2)
        );
        sauceCartPage.getItemRemoveButton(sortedItems[0]).click();
        expect(sauceCartPage.getAllCartItems().length).toEqual(1);
    })

    it('checks out', () => {
        sauceCheckoutStepOnePage = sauceCartPage.checkout();
        expect(sauceCheckoutStepOnePage.getTitle()).toEqual('Swag Labs');
        expect(sauceCheckoutStepOnePage.getUrl()).toEqual('https://www.saucedemo.com/checkout-step-one.html');
        expect(sauceCheckoutStepOnePage.getNumItemsInCart()).toEqual(1);
        expect(sauceCheckoutStepOnePage.getFirstNameField()).toBeEnabled();
        expect(sauceCheckoutStepOnePage.getLastNameField()).toBeEnabled();
        expect(sauceCheckoutStepOnePage.getZipPostCodeField()).toBeEnabled();
        expect(sauceCheckoutStepOnePage.getCancelButton()).toBeEnabled();
        expect(sauceCheckoutStepOnePage.getContinueButton()).toBeEnabled();
    })

});
