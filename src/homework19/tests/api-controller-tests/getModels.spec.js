import { test, expect } from "@playwright/test";
import CarsController from "../../controllers/CarsController.js";
import { REQUEST_STATUS } from "../../data/api/errors.js";
import { MODELS } from "../../data/cars/models.js";

test.describe.only("API Models", () => {
    let carsController;

    test.beforeEach(async ({ request }) => {
        carsController = new CarsController(request);
    });

    test("Get models using Controller", async () => {
        const allModels = Object.values(MODELS);
        const expectTitles = allModels.flatMap(modelsObject =>
            Object.values(modelsObject).map(model => model.title)
        );

        const response = await carsController.getCarsModels();
        const body = await response.json();
        const expectedResponse = body.data.map(model => ({
            id: expect.any(Number),
            carBrandId: expect.any(Number),
            title: expect.any(String),
        }));

        const titlesFromResponse = body.data.map(model => model.title);
        expect(response.status()).toBe(REQUEST_STATUS.CODE.ok);
        expect(body.status).toBe(REQUEST_STATUS.STATUS.success);
        expect(body.data).not.toEqual([]);
        expect(body.data).toEqual(expect.arrayContaining(expectedResponse));
        expect(titlesFromResponse).toEqual(expect.arrayContaining(expectTitles));
    });
});
