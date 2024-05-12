import { test, expect} from "@playwright/test";
import CarsController from "../../controllers/CarsController.js"
import { REQUEST_STATUS } from "../../data/api/errors.js";
import { BRANDS } from "../../data/cars/APIbrands.js";

test.describe.only("Brands API by ID", () => {
    let carsController;

    test.beforeEach(async ({ request }) => {
        carsController = new CarsController(request);
    });

    test.describe("Get brands using Controller", () => {
        const expectBrands = Object.values(BRANDS);

        test("Get brands", async () => {
            const response = await carsController.getCarsBrands();
            const body = await response.json();
            const expectedResponse = [
                {
                    id: expect.any(Number),
                    title: expect.any(String),
                    logoFilename: expect.any(String),
                },
            ];
            expect(response.status()).toBe(REQUEST_STATUS.CODE.ok);
            expect(body.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(body.data).not.toEqual([]);
            expect(body.data).toEqual(expect.objectContaining(expectedResponse));
            expect(body.data).toEqual(expect.objectContaining(expectBrands));
        });
    });

    test.describe("Get brand by ID using Controller", () => {
        test("Positive", async () => {
            const brand = BRANDS.Audi;
        
            const response = await carsController.getCarsBrandById(brand.id);
            const body = await response.json();
            const expectedResponse = {
                id: brand.id,
                title: brand.title,
                logoFilename: brand.logoFilename,
            };
        
            expect(response.status()).toBe(REQUEST_STATUS.CODE.ok);
            expect(body.status).toBe(REQUEST_STATUS.STATUS.success);
            expect(body.data).not.toEqual([]);
            expect(body.data).toEqual(expectedResponse);
        });

        test.describe("Negative - incorrect brand ID", () => {
            test("Response status should be 'failed' and HTTP status should be 'notFound'", async () => {
                const incorrectID = Math.floor(Math.random() * 100); 
                const response = await carsController.getCarsBrandById(incorrectID);
                const body = await response.json();
        
                expect(body.status).toBe(REQUEST_STATUS.STATUS.failed);
                expect(response.status()).toBe(REQUEST_STATUS.CODE.notFound);
            });
        });
    });
});