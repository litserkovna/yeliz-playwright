import { test, expect } from '@playwright/test';

test.describe("Registration Form Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("");
    console.log('Page URL:', page.url());
    const SignUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
    await SignUpButton.click();
  })

  test.describe('Positive Scenario', () => { 
    test.afterEach('Removing created user', async ({ page }) => {
      const SettingsButton = page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn:has-text("Settings")');
      await SettingsButton.click();
      await expect(page).toHaveURL("/panel/settings");
      await page.click('button.btn.btn-danger-bg:has-text("Remove my account")');
      await page.click('button.btn.btn-danger:has-text("Remove")');

      await expect(page).toHaveURL('/');
    });

    test('Registering a user', async ({ page }) => {
      const nameInput = page.locator('input[name="name"]');
      const lastNameInput = page.locator('input[name="lastName"]');
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');
      const repeatPasswordInput = page.locator('input[name="repeatPassword"]');
      const registerButton = page.locator('button', { hasText: 'Register' });

      await nameInput.pressSequentially('Test', { delay: 100 });
      await lastNameInput.pressSequentially('Automation', { delay: 100 });
      await emailInput.pressSequentially('aqa-litser@gmail.com', { delay: 100 });
      await passwordInput.pressSequentially('Password123', { delay: 100 });
      await repeatPasswordInput.pressSequentially('Password123', { delay: 100 });
      await registerButton.click();
      await expect(page).toHaveURL('/panel/garage');
    });
  });

//Name Field
  test('Name Field Validation - Empty Field', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const nameErrorMessage = page.locator('div.invalid-feedback >> p');

    await nameInput.fill('');
    await nameInput.focus();
    await nameInput.blur();

    await expect(nameErrorMessage).toHaveText('Name required');
    await expect(nameErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Name Field Validation - Wrong Data', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const nameErrorMessage = page.locator('div.invalid-feedback >> p');

    
    await nameInput.pressSequentially('123',{ delay: 100 });
    await nameInput.focus();
    await nameInput.blur();

    await expect(nameErrorMessage).toHaveText('Name is invalid');
    await expect(nameErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Name Field Validation - Wrong Length', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const nameErrorMessage = page.locator('div.invalid-feedback >> p');

    await nameInput.pressSequentially('A',{ delay: 100 });
    await nameInput.focus();
    await nameInput.blur();

    await expect(nameErrorMessage).toHaveText('Name has to be from 2 to 20 characters long');
    await expect(nameErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

//Last Name Field
test('Empty Last Name field validation', async ({ page }) => {
  const lastNameInput = page.locator('input[name="lastName"]');
  const lastNameErrorMessage = page.locator('div.invalid-feedback p');
  await lastNameInput.fill('');
  await lastNameInput.focus();
  await lastNameInput.blur();

  await expect(lastNameErrorMessage).toHaveText('Last name required');
});

test('Invalid Last Name data - Wrong length', async ({ page }) => {
  const lastNameInput = page.locator('input[name="lastName"]');
  const lastNameErrorMessage = page.locator('div.invalid-feedback p');
  await lastNameInput.fill('a');
  await lastNameInput.focus();
  await lastNameInput.blur();
  await expect(lastNameErrorMessage).toHaveText('Last name has to be from 2 to 20 characters long');

});

test('Invalid Last Name data - Wrong characters', async ({ page }) => {
  const lastNameInput = page.locator('input[name="lastName"]');
  const lastNameErrorMessage = page.locator('div.invalid-feedback p');
  await lastNameInput.fill('123');
  await lastNameInput.focus();
  await lastNameInput.blur();
  await expect(lastNameErrorMessage).toHaveText('Last name is invalid');
});

test('Invalid Last Name data - Exceeds maximum length', async ({ page }) => {
  const lastNameInput = page.locator('input[name="lastName"]');
  const lastNameErrorMessage = page.locator('div.invalid-feedback p');
  await lastNameInput.fill('A'.repeat(25)); 
  await lastNameInput.focus();
  await lastNameInput.blur();
  await expect(lastNameErrorMessage).toHaveText('Last name has to be from 2 to 20 characters long');
});

//Email Field
test('Empty Email field validation', async ({ page }) => {
  const emailInput = page.locator('input[name="email"]');
  const emailInputErrorMessage = page.locator('div.invalid-feedback p');
  await emailInput.fill('');
  await emailInput.focus();
  await emailInput.blur();
  await expect(emailInputErrorMessage).toHaveText('Email required');
});

test('Invalid Email data - Incorrect format', async ({ page }) => {
  const emailInput = page.locator('input[name="email"]');
  const emailInputErrorMessage = page.locator('div.invalid-feedback p');
  await emailInput.fill('test.email');
  await emailInput.focus();
  await emailInput.blur();
  await expect(emailInputErrorMessage).toHaveText('Email is incorrect');
});
//Password Field
 test('Empty Password field validation', async ({ page }) => {
  const passwordInput = page.locator('input[name="password"]');
  const passwordError = page.locator('div.invalid-feedback p');
  await passwordInput.fill('');
  await passwordInput.focus();
  await passwordInput.blur();
  await expect(passwordError).toHaveText('Password required');
  });

  test('Invalid Password data - Incorrect format', async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    const passwordError = page.locator('div.invalid-feedback p');
    await passwordInput.fill('test.email',{ timeout: 2000 });
    await passwordInput.focus();
    await passwordInput.blur();
    await expect(passwordError).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');  });

  test('Invalid Password data - Too short', async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');
    const passwordError = page.locator('div.invalid-feedback p');
    await passwordInput.fill('Aa', {timeout: 2000});
    await passwordInput.focus();
    await passwordInput.blur();
    await expect(passwordError).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');  });

test('Invalid Password data - Too long', async ({ page }) => {
  const passwordInput = page.locator('input[name="password"]');
  const passwordError = page.locator('div.invalid-feedback p');
  await passwordInput.fill('A'.repeat(20));
  await passwordInput.focus();
  await passwordInput.blur();
  await expect(passwordError).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
});

test('Invalid Password data - No capital letter', async ({ page }) => {
  const passwordInput = page.locator('input[name="password"]');
  const passwordError = page.locator('div.invalid-feedback p');
  await passwordInput.fill('a'.repeat(6));
  await passwordInput.focus();
  await passwordInput.blur();
  await expect(passwordError).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
});

test('Invalid Password data - No small letter', async ({ page }) => {
  const passwordInput = page.locator('input[name="password"]');
  const passwordError = page.locator('div.invalid-feedback p');
  await passwordInput.fill('A1'.repeat(6));
  await passwordInput.focus();
  await passwordInput.blur();
  await expect(passwordError).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
});

test('Empty Re-enter Password field validation', async ({ page }) => {
  const repeatPasswordInput = page.locator('input[name="repeatPassword"]');
  const secondPasswordError = page.locator('div.invalid-feedback p');
  await repeatPasswordInput.fill('');
  await repeatPasswordInput.focus();
  await repeatPasswordInput.blur();
  await expect(secondPasswordError).toHaveText('Re-enter password required');
});

test('Invalid Re-enter Password data - Passwords do not match', async ({ page }) => {
  const repeatPasswordInput = page.locator('input[name="repeatPassword"]');
  const secondPasswordError = page.locator('div.invalid-feedback p');
  await repeatPasswordInput.fill('passWord1');
  await repeatPasswordInput.focus();
  await repeatPasswordInput.blur();
  await expect(secondPasswordError).toHaveText('Passwords do not match')

})
});