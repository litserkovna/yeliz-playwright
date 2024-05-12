// import { test, expect } from "@playwright/test";
// import CarsController from "../../controllers/CarsController.js";
// import { REQUEST_STATUS } from "../../data/api/errors.js";
// import { USER_YELIZ_STORAGE_STATE_PATH } from "../../constats.js"; 

// test.describe("Get current user cars", () => {
//     let carsController;

//     test.beforeEach(async ({ context, browser }) => {
//         const storageState = {USER_YELIZ_STORAGE_STATE_PATH }; 
//         const contextOptions = { ...context.options, storageState };
//         const page = await browser.newPage(contextOptions);
//         carsController = new CarsController(page);
//     });

//     test("Positive case - User is logged in", async () => {
//         const response = await carsController.getUserCars();
//         const body = await response.json();

//         expect(response.status()).toBe(REQUEST_STATUS.CODE.ok);

//         expect(body.status).toBe("ok");

//         expect(body.data).toHaveLength(1); 
//         const car = body.data[0];
//         expect(car).toEqual({
//             id: expect.any(Number),
//             carBrandId: expect.any(Number),
//             carModelId: expect.any(Number),
//             initialMileage: expect.any(Number),
//             updatedMileageAt: expect.any(String),
//             carCreatedAt: expect.any(String),
//             mileage: expect.any(Number),
//             brand: expect.any(String),
//             model: expect.any(String),
//             logo: expect.any(String)
//         });
//     });

//     test("Negative case - User is not logged in", async () => {
//         const response = await carsController.getUserCars();
//         const body = await response.json();
//         expect(response.status()).toBe(401);
//         expect(body.status).toBe("ok");
//         expect(body.message).toBe("Not authenticated");
//     });
// });
