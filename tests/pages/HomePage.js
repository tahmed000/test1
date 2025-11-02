// POM for Demoblaze Home Page
const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.loginButton = page.locator('#login2');
        this.welcomeUser = page.locator('#nameofuser');
        this.logoutLink = page.locator('#logout2');
    }

    async goto() {
        await this.page.goto('https://demoblaze.com/');
    }

    async isAtHomePage() {
        await expect(this.page).toHaveURL(/demoblaze\.com/);
        await expect(this.loginButton).toBeVisible();
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async isLoggedIn(username) {
        await expect(this.logoutLink).toBeVisible();
        await expect(this.welcomeUser).toHaveText(`Welcome ${username}`);
    }
};