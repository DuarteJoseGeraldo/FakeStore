import productService from "./productService";
import categoryService from "./categoryService";

import populateRepository from "../repository/populateRepository";
import { apiProduct } from "../repository/productRepository";

const populateCategories = async () => {
  const categoryNames: any = await populateRepository.getCategories();

  const categories: any = await categoryNames.map(async (item: string) => {
    const id = await categoryService.insertCategory({
      name: item,
      image:
        "https://cdn-icons-png.flaticon.com/512/190/190738.png?w=740&t=st=1685722131~exp=1685722731~hmac=7bf9f15e92c8018f8f72ed186adf98db6aab33fecbc4892cc1905105064d4091",
    });
    return id;
  });

  const categoriesResolved: any = await Promise.all(categories);

  return categoriesResolved;
};

const populateProducts = async () => {
  const products: any = await populateRepository.getProducts();

  const insertProducts = await products.map(async (product: apiProduct) => {
    const newProduct = await productService.insertProduct(product);
    return newProduct;
  });

  const result = await Promise.all(insertProducts);

  return result;
};

export default { populateCategories, populateProducts };
