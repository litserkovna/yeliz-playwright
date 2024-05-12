import { test, expect } from "@playwright/test";
import CarsController from "../../controllers/CarsController.js";
import { REQUEST_STATUS } from "../../data/api/errors.js";
import { MODELS } from "../../data/cars/models.js";

test.describe.only("Models ID API", ()=>{
    let carsController
    test.beforeEach(async ({request})=>{
        carsController = new CarsController(request);
    })

    test.describe("Positive case to get model by ID with Controller", ()=>{
        const model = MODELS["1"].A8;

        test("Get car's model by ID", async ()=>{
            const response = await carsController.getCarsModelById(model.id);
            const body = await response.json();
            const expectedResponse =
                {
                    id: model.id,
                    carBrandId: model.carBrandId,
                    title: model.title,
                }

            expect(response.status()).toBe(REQUEST_STATUS.CODE.ok);
            expect(body.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(body.data).not.toEqual([]);
            expect(body.data).toEqual(expectedResponse);

        })

    })

    test.describe('Negative case for get model by id', () => {
        test('Incorrect model ID', async () => {
            const incorrectID = Math.floor(Math.random() * 1000);
            const response = await carsController.getCarsModelById(incorrectID);
            const body = await response.json();

            expect(body.status).toBe(REQUEST_STATUS.STATUS.failed);
            expect(response.status()).toBe(REQUEST_STATUS.CODE.notFound);
        })
    })

})