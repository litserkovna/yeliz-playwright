import { expect } from "@playwright/test"
import { test } from "../fixtures/userGaragePage"
import { user } from '../data/mock/user.js'
import ProfilePage from "../PageObjects/Profile/Profile"

test.describe.only("User Mocks", ()=> {
  test('should display user info', async ({garagePage}) => {
    const { page } = garagePage
    const {data: { name, lastName }} = user
    await page.route('/api/users/profile', (route) =>{
      return route.fulfill({
          status: 200,
          body: JSON.stringify(user)
          })
      })
    await garagePage.navBar.profileButton.click()
    const profilePage = new ProfilePage(page)
    expect(page).toHaveURL(/profile/)
    await expect(profilePage.profileName).toHaveText(`${name} ${lastName}`)
  })
})