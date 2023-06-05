import { Router } from "express";
import productsController from "../controllers/productsController";
import dataValidator from "../middlewares/dataValidator";
import tokenValidator from "../middlewares/tokenValidator";
import { router as categoriesRoutes } from "./categories";
import { category as categoryRoutes } from "./category";

const productsRoutes: Router = Router();

productsRoutes.use("/categories", categoriesRoutes);

productsRoutes.use("/category", categoryRoutes);

productsRoutes.get("/", productsController.index);

productsRoutes.get("/bestselling", productsController.bestSelling);

productsRoutes.get(
  "/:id",
  dataValidator.idParamsValidator,
  productsController.show
);

productsRoutes.post(
  "/",

  dataValidator.productDataValidator,
  productsController.insert
);

productsRoutes.put(
  "/:id",

  dataValidator.productUpdateValidator,
  productsController.updateAllData
);

productsRoutes.delete(
  "/:id",
  dataValidator.idParamsValidator,
  productsController.remove
);

productsRoutes.patch(
  "/:id",

  dataValidator.productPathValidator,
  productsController.update
);

export { productsRoutes };
