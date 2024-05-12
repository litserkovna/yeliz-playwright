import { expect } from "@playwright/test";
import { ENDPOINTS } from "../../data/api/urls.js";
import { randInt, getRandomModel } from "../random.js";

export async function createCar(request, { carBrandId, carModelId, mileage }) {
  const response = await request.post(ENDPOINTS.cars, {
    data: {
      carBrandId,
      carModelId,
      mileage,
    },
  });
  
  expect(response.status()).toBe(201);

  return await response.json();
}

export async function createRandomCar(request) {
  const { carBrandId, model } = getRandomModel();

  return await createCar(request, {
    carBrandId,
    carModelId: model.id,
    mileage: randInt(0, 100),
  });
}

export async function getCars(request) {
  const response = await request.get(ENDPOINTS.cars);
  expect(response.status()).toEqual(200);

  const { data } = await response.json();

  return data;
}

export async function deleteCar(request, carId) {
  const response = await request.delete(`${ENDPOINTS.cars}/${carId}`);
  expect(response.status()).toBe(200);

  return await response.json();
}

export default {
  createCar,
  createRandomCar,
  getCars,
  deleteCar,
};
