// POM for Demoblaze Login Popup
const { expect } = require('@playwright/test');

exports.LoginPopup = class LoginPopup {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#loginusername');
        this.passwordField = page.locator('#loginpassword');
        this.loginModal = page.locator('#logInModal');
        this.loginSubmit = page.locator('button:has-text("Log in")');
    }

    async isVisible() {
        await expect(this.loginModal).toBeVisible();
        await expect(this.usernameField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginSubmit.click();
    }
};