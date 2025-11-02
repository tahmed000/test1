// Playwright test for Demoblaze login scenario using POM and external test data
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPopup } = require('../pages/LoginPopup');
const testData = require('../test-data.json');

test.describe('Demoblaze login scenario', () => {
    test('should login and verify homepage', async ({ page }) => {
        const home = new HomePage(page);
        const loginPopup = new LoginPopup(page);
        const { baseURL, username, password } = testData;

        // 1. Navigate to the environment-specific URL
        await page.goto(baseURL);

        // 2. Verify if this is the homepage of the application
        await home.isAtHomePage();

        // 3. Click Log In button
        await home.clickLogin();

        // 4. Verify the log in pop up UI displayed
        await loginPopup.isVisible();

        // 5. Enter Username in the username edit field
        // 6. Enter password in the password edit field
        await loginPopup.login(username, password);

        // 7. Verify after successful login user navigate to categories page and Log out link is displayed
        // 8. Verify Welcome username displayed and remember that username is depend on whichever the username entered in the username filed
        await home.isLoggedIn(username);
    });
});
