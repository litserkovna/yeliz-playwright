import { test as setup, expect } from "@playwright/test";
import MainPage from "../../PageObjects/MainPage/MainPage.js";
import { USER_YELIZ_STORAGE_STATE_PATH } from "../../constats.js";
import { testUser } from "../../data/testUser.js";

setup.describe('Setup', ()=> {
    setup("Login and Save", async({page}) => {
        const mainPage = new MainPage(page)
        await mainPage.navigate()
        const signInPopup = await mainPage.openSignInPopup()
        await signInPopup.page.waitForSelector('#signinEmail');
        await signInPopup.emailInput.fill(testUser.Li_Test.email)
        await signInPopup.passwordInput.fill(testUser.Li_Test.password)
        await signInPopup.signInButton.click()

        await expect(page).toHaveURL(/garage/)

        await page.context().storageState({
            path: USER_YELIZ_STORAGE_STATE_PATH
        })
    })
})