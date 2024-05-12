// import { test, expect } from "@playwright/test";
// import CarsController from "../../controllers/CarsController.js"
// import { REQUEST_STATUS } from "../../data/api/errors.js";
// import { BRANDS } from "../../data/cars/APIbrands.js";
// import { MODELS } from "../../data/cars/models.js";
// import { USER_YELIZ_STORAGE_STATE_PATH } from "../../../homework19/constats.js";
// import { CAR_DETAILS } from "../../data/cars/carDetails.js"

// test.describe("Cars API", () => {
//     let carsController;
//     const brand = BRANDS.Audi;
//     const model = MODELS["1"].Q7;

//     test.beforeEach(async ({request}) => {
//         carsController = new CarsController(request);
//     });

//     test.describe("Positive case to update car by id", () => {
//         test.afterAll(async () => {
//             const request = await newContext({storageState: USER_YELIZ_STORAGE_STATE_PATH});
//             carsController = new CarsController(request);
//             const carsResponse = await carsController.getUserCars();
//             const cars = await carsResponse.json();
//             await Promise.all(cars.data.map((car) => carsController.deleteCar(car.id)));
//         });

//         test("Update car by id", async () => {
//             const requestBody = {
//                 "carBrandId": CAR_DETAILS.id,
//                 "carModelId": CAR_DETAILS.model,
//                 "mileage": Math.floor(Math.random() * 100)
//             };

//             const createResponse = await carsController.createCar(requestBody);
//             const createdBody = await createResponse.json();

//             expect(createdBody.status).toBe(REQUEST_STATUS.STATUS.success);
//             expect(createResponse.status()).toBe(REQUEST_STATUS.CODE.create);

//             const carID = createdBody.data.id;
//             const updateCarDetails = {
//                 "carBrandId": createdBody.data.carBrandId,
//                 "carModelId": createdBody.data.carModelId,
//                 "carCreatedAt": createdBody.data.carCreatedAt,
//                 "mileage": createdBody.data.mileage + 1
//             };

//             const updateResponse = await carsController.updateCar(updateCarDetails, carID);
//             const updateCarBody = await updateResponse.json();

//             expect(updateCarBody.status).toBe(REQUEST_STATUS.STATUS.success);
//             expect(updateResponse.status()).toBe(REQUEST_STATUS.CODE.ok);
//             expect(updateCarBody.data.mileage).toEqual(createdBody.data.mileage + 1);
//         });

//         test("Negative case - update car by incorrect id", async () => {
//             const requestBody = {
//                 "carBrandId": brand.id,
//                 "carModelId": model.id,
//                 "mileage": Math.floor(Math.random() * 100)
//             };

//             const createResponse = await carsController.createCar(requestBody);
//             const createdBody = await createResponse.json();

//             expect(createdBody.status).toBe(REQUEST_STATUS.STATUS.success);
//             expect(createResponse.status()).toBe(REQUEST_STATUS.CODE.create);

//             const incorrectID = Math.floor(Math.random() * 100);
//             const updateCarDetails = {
//                 "carBrandId": createdBody.data.carBrandId,
//                 "carModelId": createdBody.data.carModelId,
//                 "carCreatedAt": createdBody.data.carCreatedAt,
//                 "mileage": createdBody.data.mileage + 1
//             };

//             const updateResponse = await carsController.updateCar(updateCarDetails, incorrectID);
//             const updateCarBody = await updateResponse.json();

//             expect(updateCarBody.status).toBe(REQUEST_STATUS.STATUS.failed);
//             expect(updateResponse.status()).toBe(REQUEST_STATUS.CODE.notFound);
//         });

//         test("Negative case - update car by incorrect body", async () => {
//             const requestBody = {
//                 "carBrandId": brand.id,
//                 "carModelId": model.id,
//                 "mileage": Math.floor(Math.random() * 100)
//             };

//             const createResponse = await carsController.createCar(requestBody);
//             const createdBody = await createResponse.json();

//             expect(createdBody.status).toBe(REQUEST_STATUS.STATUS.success);
//             expect(createResponse.status()).toBe(REQUEST_STATUS.CODE.create);

//             const carID = createdBody.data.id;
//             const incorrectCarDetails = {
//                 "carBrandId": brand.id, 
//                 "carModelId": model.id,
//                 "mileage": "155000" 
//             };

//             const updateResponse = await carsController.updateCar(incorrectCarDetails, carID);
//             const updateCarBody = await updateResponse.json();

//             expect(updateCarBody.status).toBe(REQUEST_STATUS.STATUS.failed);
//             expect(updateResponse.status()).toBe(REQUEST_STATUS.CODE.badRequest);
//         });
//     });
// });
