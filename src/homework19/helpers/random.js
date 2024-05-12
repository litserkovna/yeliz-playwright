import { BRANDS } from "../data/cars/brands"

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function getRandomBrand() {
  const brand = BRANDS[randInt(0, BRANDS.length)]

  return {
    brand,
    carBrandId: brand.id
  }
}

export function getRandomModel(brandId) {
  const carBrandId = brandId || getRandomBrand().carBrandId
  const { models } = BRANDS.find((el)=> {
    return el.id === carBrandId;
  })

  return {
    carBrandId,
    model: models[randInt(0, models.length)]
  }
}