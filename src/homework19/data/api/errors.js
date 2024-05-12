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
