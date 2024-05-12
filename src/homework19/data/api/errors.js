export const API_ERRORS = {
  CAR: {
    CarBrandRequiredError: {
      status: "error",
      message: "Car brand id is required",
    },
    CarModelRequiredError: {
      status: "error",
      message: "Car model id is required",
    },
    InvalidCarModelTypeError: {
      status: "error",
      message: "Invalid car model type",
    },
    InvalidMillage: {
      status: "error",
      message: "Mileage has to be from 0 to 999999",
    },
    NotAllowedParametr: {
      status: "error",
      message: '"4x4" is not allowed',
    }
  },
};

export const REQUEST_STATUS = {
    CODE : {
        "ok" : 200,
        "create" : 201,
        "badRequest" : 400,
        "notFound" : 404,
        "unAuthorize": 401

    },
    STATUS : {
        "success" : "ok",
        "failed" : "error"

    },
    MESSAGE:{
        "maxMill":'"mileage" must be a safe number',
        "minMill":"Mileage has to be from 0 to 999999",
        "brand_required": "Car brand id is required",
        "model_required": "Car model id is required",
        "incorrect_mileage": "Invalid mileage type",
        "fake_brand": "Brand not found",
        "fake_model": "Model not found",
        "unauthorized": "Not authenticated"
    }
};

