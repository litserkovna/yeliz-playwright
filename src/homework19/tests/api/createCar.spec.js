import { test } from "../../fixtures/userGaragePage.js";
import { BRANDS } from "../../data/cars/brands.js";
import { expect } from "@playwright/test";
import {
  createCar,
  deleteCar,
  createRandomCar,
  getCars,
} from "../../helpers/api/cars.js";
import {
  getRandomBrand,
  getRandomModel,
  randInt,
} from "../../helpers/random.js";
import { ENDPOINTS } from "../../data/api/urls.js";
import { API_ERRORS } from "../../data/api/errors.js";

test.describe("Cars API", () => {
  test.describe("Create and delete all cars", () => {
    test.afterEach(async ({ request }) => {
      const cars = await getCars(request);

      await Promise.all(cars.map((car) => deleteCar(request, car.id)));
    });

    BRANDS.forEach(({ id: carBrandId, brand, models }) => {
      models.forEach(({ id: carModelId, model }) => {
        test(`Create a ${brand} ${model}`, async ({ request }) => {
          const mileage = randInt(0, 100);
          const { data } = await createCar(request, {
            carBrandId,
            carModelId,
            mileage,
          });

          const expected = {
            id: expect.any(Number),
            carBrandId,
            carModelId,
            initialMileage: mileage,
            updatedMileageAt: expect.any(String),
            carCreatedAt: expect.any(String),
            mileage,
            brand,
            model,
            logo: `${brand.toLowerCase()}.png`,
          };

          expect(data).toMatchObject(expected);

          const cars = await getCars(request);
          expect(
            cars.some((car) => {
              return (
                car.id === data.id &&
                car.mileage === mileage &&
                car.brand === brand &&
                car.model === model
              );
            })
          ).toBeTruthy();
        });
      });
    });

    test("Delete car", async ({ request }) => {
      const { data: car } = await createRandomCar(request);
      let cars = await getCars(request);
      expect(cars.some((el) => el.id === car.id)).toBeTruthy();

      await deleteCar(request, car.id);

      cars = await getCars(request);
      expect(cars.some((el) => el.id === car.id)).toBeFalsy();
    });
  });

  test.describe("Error creating cars", () => {
    test("Empty request body", async ({ request }) => {
      const response = await request.post(ENDPOINTS.cars, {});
      const body = await response.json();

      expect(response.status()).toBe(400);
      expect(body).toEqual(API_ERRORS.CAR.CarBrandRequiredError);
    });

    test("Empty model id", async ({ request }) => {
      const {
        carBrandId,
        brand: { brand },
      } = getRandomBrand();

      await test.step(`Check create car with brand "${brand}" and without model id`, async () => {
        const response = await request.post(ENDPOINTS.cars, {
          data: {
            carBrandId,
            mileage: randInt(0, 100),
          },
        });
        const body = await response.json();

        expect(response.status()).toBe(400);
        expect(body).toEqual(API_ERRORS.CAR.CarModelRequiredError);
      });
    });

    test("Not valid model id", async ({ request }) => {
      const {
        carBrandId,
        brand: { brand },
      } = getRandomBrand();

      await test.step(`Check create car with brand "${brand}" and not valid model`, async () => {
        const response = await request.post(ENDPOINTS.cars, {
          data: {
            carBrandId,
            carModelId: randInt(100, 1000) + "x",
            mileage: randInt(0, 100),
          },
        });
        const body = await response.json();
        expect(response.status()).toBe(400);
        expect(body).toEqual(API_ERRORS.CAR.InvalidCarModelTypeError);
      });
    });
    test("With negative mileage", async ({ request }) => {
      const {
        carBrandId,
        brand: { brand },
      } = getRandomBrand();
      const {
        model: { id: carModelId, model },
      } = getRandomModel(carBrandId);

      await test.step(`Check create car with brand "${brand}", model "${model}" and negative mileage`, async () => {
        const response = await request.post(ENDPOINTS.cars, {
          data: {
            carBrandId,
            carModelId,
            mileage: randInt(-200, -1),
          },
        });
        const body = await response.json();
        expect(response.status()).toBe(400);
        expect(body).toEqual(API_ERRORS.CAR.InvalidMillage);
      });
    });

    test("With new parameter", async ({ request }) => {
      const {
        carBrandId,
        brand: { brand },
      } = getRandomBrand();
      const {
        model: { id: carModelId, model },
      } = getRandomModel(carBrandId);
      const parametr = "4x4"

      await test.step(`Create car with brand "${brand}", model "${model}" and new parameter '${parametr}'`, async () => {
        const response = await request.post(ENDPOINTS.cars, {
          data: {
            carBrandId,
            carModelId,
            mileage: randInt(0, 100),
            [parametr]: true,
          },
        });
        const body = await response.json();
        expect(response.status()).toBe(400);
        expect(body).toEqual(API_ERRORS.CAR.NotAllowedParametr);
      });
    });
  });
});
