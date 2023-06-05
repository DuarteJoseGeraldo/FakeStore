import { Router } from "express";
import categoriesController from "../controllers/categoriesController";
import dataValidator from "../middlewares/dataValidator";
import tokenValidator from "../middlewares/tokenValidator";

const categories: Router = Router();

categories.get("/", categoriesController.index);

categories.post(
  "/",
  dataValidator.categoryDataValidator,
  categoriesController.insert
);

categories.put(
  "/:name",

  dataValidator.categoryUpdateValidator,
  categoriesController.update
);

categories.delete(
  "/:name",

  dataValidator.nameParamsValidatator,
  categoriesController.remove
);

export { categories as router };
