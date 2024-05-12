// import { test, expect } from "@playwright/test";
// import CarsController from "../../controllers/CarsController.js";
// import { REQUEST_STATUS } from "../../data/api/errors.js";
// import { BRANDS } from "../../data/cars/APIbrands.js";
// import { MODELS } from "../../data/cars/models.js";
// import { USER_YELIZ_STORAGE_STATE_PATH } from "../../../homework19/constats.js";

// test.describe("Cars API", () => {
//     let carsController;
//     test.beforeEach(async ({ page, request }) => {
//         await page.context().storageState({ path: USER_YELIZ_STORAGE_STATE_PATH });
//         carsController = new CarsController(page, request);
//     });

//     test.describe("Positive case to get car by id", () => {
//         test("Get new car by id", async () => {
//             const brand = BRANDS.Audi;
//             const model = MODELS["1"].Q7;
//             let carID;

//             const requestBody = {
//                 "carBrandId": brand.id, "carModelId": model.id, "mileage": Math.floor(Math.random() * 100)
//             };

//             const response = await carsController.createCar(requestBody);
//             const body = await response.json();

//             const expectedBodyCar = {
//                 "id": expect.any(Number),
//                 "carBrandId": requestBody.carBrandId,
//                 "carModelId": requestBody.carModelId,
//                 "initialMileage": requestBody.mileage,
//                 "updatedMileageAt": expect.any(String),
//                 "carCreatedAt": expect.any(String),
//                 "mileage": requestBody.mileage,
//                 "brand": brand.title,
//                 "model": model.title,
//                 "logo": brand.logoFilename
//             };

//             expect(body.status).toBe(REQUEST_STATUS.STATUS.success);
//             expect(response.status()).toBe(REQUEST_STATUS.CODE.create);

//             carID = (body.data.id);
//             const responseTest = await carsController.getUserCarById(carID);
//             const getCarBody = await response.json();

//             expect(getCarBody.status).toBe(REQUEST_STATUS.STATUS.success);
//             expect(responseTest.status()).toBe(REQUEST_STATUS.CODE.ok);
//             expect(getCarBody.data).toEqual(expectedBodyCar);
//         })

//     })

//     test.describe('Negative case for get car by id', () => {
//         test('Incorrect car ID', async () => {
//             const incorrectID = Math.floor(Math.random() * 100);
//             const response = await carsController.getUserCarById(incorrectID);
//             const body = await response.json();

//             expect(body.status).toBe(REQUEST_STATUS.STATUS.failed);
//             expect(response.status()).toBe(REQUEST_STATUS.CODE.notFound);
//         })
//     })
// })