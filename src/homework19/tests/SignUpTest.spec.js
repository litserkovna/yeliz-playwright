import { test, expect } from "@playwright/test";
import MainPage from "../PageObjects/MainPage/MainPage.js";
import SettingsPage from "../PageObjects/SettingsPage/SettingsPage.js";
import { testUser } from "../data/testUser.js";

test.describe("Registration Form Tests", () => {
  let component;
    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.navigate();
        component = await mainPage.openRegistrationPopup();
    });
test.describe("Positive Scenario", () => {
  test.afterEach('Removing created account', async ({ page }) => {
    const settingsPage = new SettingsPage(page);
    await settingsPage.openSettings();
    await settingsPage.removeCreatedAccount();
    await settingsPage.confirmDelete();
    await expect(page).toHaveURL("");
  });
  test("Registering a user", async ({page}) => {
    await test.step("Successful Registration", async()=> {
    await component.nameInput.pressSequentially(testUser.Li_Test.name,{ delay: 100 });
    await component.lastNameInput.pressSequentially(testUser.Li_Test.lastName,{ delay: 100 });
    await component.emailInput.pressSequentially(testUser.Li_Test.email,{ delay: 100 });
    await component.passwordInput.pressSequentially(testUser.Li_Test.password,{ delay: 100 });
    await component.repeatPasswordInput.pressSequentially(testUser.Li_Test.repeatPassword,{ delay: 100 });
    await component.registerButton.click();
    await expect(page).toHaveURL("/panel/garage");
  });
});
});
//Name Field
test("Name Field Validation test", async () => {
    await component.nameInput.fill("");
    await component.nameInput.focus();
    await component.nameInput.blur();
    await expect(component.nameErrorMessage).toHaveText("Name required");
    await expect(component.nameErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

test("Name Field Validation - Wrong Data", async () => {
  await component.nameInput.pressSequentially("123", { delay: 100 });
  await component.nameInput.focus();
  await component.nameInput.blur();
  await expect(component.nameErrorMessage).toHaveText("Name is invalid",);
  await expect(component.nameErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

test("Name Field Validation - Wrong Length", async () => {
  await component.nameInput.pressSequentially("A", { delay: 100 });
  await component.nameInput.focus();
  await component.nameInput.blur();
  await expect(component.nameErrorMessage).toHaveText("Name has to be from 2 to 20 characters long",);
  await expect(component.nameErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)",);
});

//Last Name Field
  test("Empty Last Name", async() => {
  await component.lastNameInput.fill("");
  await component.lastNameInput.focus();
  await component.lastNameInput.blur();
  await expect(component.lastNameErrorMessage).toHaveText("Last name required");
  await expect(component.lastNameErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

test("Invalid Last Name data - Wrong length", async () => {
  await component.lastNameInput.fill("a");
  await component.lastNameInput.focus();
  await component.lastNameInput.blur();
  await expect(component.lastNameErrorMessage).toHaveText("Last name has to be from 2 to 20 characters long");
  await expect(component.lastNameErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

test("Invalid Last Name data - Wrong characters", async () => {
  await component.lastNameInput.fill("123");
  await component.lastNameInput.focus();
  await component.lastNameInput.blur();
  await expect(component.lastNameErrorMessage).toHaveText("Last name is invalid");
  await expect(component.lastNameErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

test("Invalid Last Name data - Exceeds maximum length", async () => {
  await component.lastNameInput.fill("A".repeat(25));
  await component.lastNameInput.focus();
  await component.lastNameInput.blur();
  await expect(component.lastNameErrorMessage).toHaveText("Last name has to be from 2 to 20 characters long");
  await expect(component.lastNameErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});
////////////////
//Email Field
test("Email field validation", async () => {
  await component.emailInput.fill("");
  await component.emailInput.focus();
  await component.emailInput.blur();
  await expect(component.emailErrorMessage).toHaveText("Email required");
  await expect(component.emailErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

test("Invalid Email data - Incorrect format", async () => {
  await component.emailInput.fill("test.email");
  await component.emailInput.focus();
  await component.emailInput.blur();
  await expect(component.emailErrorMessage).toHaveText("Email is incorrect");
  await expect(component.emailErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

//Password Field
test("Password field validation", async () => {
  await component.passwordInput.fill("");
  await component.passwordInput.focus();
  await component.passwordInput.blur();
  await expect(component.passwordErrorMessage).toHaveText("Password required");
  await expect(component.passwordErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

test("Invalid Password data - Incorrect format", async () => {
  await component.passwordInput.fill("test.email", {timeout: 2000});
  await component.passwordInput.focus();
  await component.passwordInput.blur();
  await expect(component.passwordErrorMessage).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
  await expect(component.passwordErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

test("Invalid Password data - Too short", async () => {
  await component.passwordInput.fill("Aa", { timeout: 2000 });
  await component.passwordInput.focus();
  await component.passwordInput.blur();
  await expect(component.passwordErrorMessage).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
  await expect(component.passwordErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

test("Invalid Password data - Too long", async () => {
  await component.passwordInput.fill("A".repeat(20));
  await component.passwordInput.focus();
  await component.passwordInput.blur();
  await expect(component.passwordErrorMessage).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
  await expect(component.passwordErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

test("Invalid Password data - No capital letter", async () => {
  await component.passwordInput.fill("a".repeat(6));
  await component.passwordInput.focus();
  await component.passwordInput.blur();
  await expect(component.passwordErrorMessage).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
  await expect(component.passwordErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

test("Invalid Password data - No small letter", async () => {
  await component.passwordInput.fill("A1".repeat(6));
  await component.passwordInput.focus();
  await component.passwordInput.blur();
  await expect(component.passwordErrorMessage).toHaveText("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
  await expect(component.passwordErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});
//Re-Enter Password
test("Re-enter Password field validation", async () => {
  await component.repeatPasswordInput.fill("");
  await component.repeatPasswordInput.focus();
  await component.repeatPasswordInput.blur();
  await expect(component.repeatPasswordErrorMessage).toHaveText("Re-enter password required");
  await expect(component.repeatPasswordErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});

 test("Invalid Re-enter Password data - Passwords do not match", async () => {
  await component.repeatPasswordInput.fill("passWord1");
  await component.repeatPasswordInput.focus();
  await component.repeatPasswordInput.blur();
  await expect(component.secondPasswordErrorMessage).toHaveText("Passwords do not match");
  await expect(component.secondPasswordErrorMessage).toHaveCSS("border-color","rgb(220, 53, 69)");
});
}); 