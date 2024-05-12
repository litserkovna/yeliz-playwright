import {test} from "../fixtures/userGaragePage.js";
import { expect } from "@playwright/test";

test.describe('Garage (fixtures)', () => {
    test('add car', async ({garagePage}) =>{
        const brand = 'BMW'
        const model = 'X5'

        await expect(garagePage.addCarButton).toBeVisible()
        await garagePage.addCarButton.click()
        await expect(garagePage.addCarPopup).toBeVisible();
        await garagePage.brandInput.selectOption(brand);
        await garagePage.modelInput.selectOption(model);
        await garagePage.carKmInput.fill('150254');
        await garagePage.addButton.click();    

    })
})