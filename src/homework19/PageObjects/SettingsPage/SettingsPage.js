export default class SettingsPage{
    constructor(page){
        this._page = page;
        this._settingsButton = page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn', { hasText: 'Settings' });
        this._deleteMyAccountButton = page.locator('button.btn.btn-danger-bg', { hasText: 'Remove my account' });
        this._confirmDeleteButton = page.locator('button.btn.btn-danger', { hasText: 'Remove' });
    }

    async openSettings(){
        await this._settingsButton.click();
    }
    async removeCreatedAccount(){
        await this._deleteMyAccountButton.click()
    }

    async confirmDelete(){
        await this._confirmDeleteButton.click()
    }
}