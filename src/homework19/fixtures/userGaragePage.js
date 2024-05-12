import {test as base, expect as baseExpect, request} from "@playwright/test";
import GaragePage from "../PageObjects/Garage/garagePage.js";
import { USER_YELIZ_STORAGE_STATE_PATH } from "../constats.js";


export const test = base.extend({
    garagePage: async ({browser}, use)=>{
        const context = await browser.newContext({
            storageState: USER_YELIZ_STORAGE_STATE_PATH
        })
        const page = await context.newPage()
        const garagePage = new GaragePage(page)
        await garagePage.navigate()
        await use(garagePage)
    },
    request: async ( {}, use )=>{
        const req = await request.newContext({
            storageState: USER_YELIZ_STORAGE_STATE_PATH
        })
        await use(req)

        await req.dispose()
    },
})

export const expect = baseExpect;