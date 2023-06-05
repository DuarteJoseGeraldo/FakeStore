import { Router } from "express";
import populateController from "../controllers/populateController";
import tokenValidator from "../middlewares/tokenValidator";
const router: Router = Router();

router.post(
  "/products",

  populateController.insertAllProducts
);
router.post(
  "/categories",

  populateController.insertAllCategories
);

export { router };
