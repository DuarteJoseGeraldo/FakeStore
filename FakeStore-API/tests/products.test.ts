import { describe, expect, jest } from "@jest/globals";
import categoryService from "../src/service/categoryService";
import productService from "../src/service/productService";
import productRepository from "../src/repository/productRepository";
import categoryRepository from "../src/repository/categoryRepository";
import { productsRoutes } from "../src/routes/products";

describe("Teste do Service de Produtos", () => {
  it("Deve retornar um produto especifico", async () => {
    jest.spyOn(productRepository, "selectByIdWithJoin").mockResolvedValueOnce({
      id: 20,
      title: "Um produto",
      price: 250,
      description: "produto de teste",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rate: 5,
      countRate: 300,
    });

    const result = await productService.findByID(20);

    expect(result).toMatchObject({ id: 20 });
  });

  it("Deve inserir um novo produto", async () => {
    jest
      .spyOn(categoryRepository, "selectByName")
      .mockResolvedValueOnce([{ id: 1, name: "electronics" }]);

    jest.spyOn(productRepository, "insert").mockResolvedValueOnce([1]);

    jest.spyOn(productRepository, "selectByIdWithJoin").mockResolvedValueOnce({
      id: 1,
      title: "Um Produto de Teste",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rate: 3.9,
      countRate: 120,
    });

    const result = await productService.insertProduct({
      title: "Um Produto de Teste",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120,
      },
    });

    expect(result).toMatchObject({ id: 1 });
  });

  it("Deve atualizar a categoria de um produto", async () => {
    jest.spyOn(productRepository, "selectByIdWithJoin").mockResolvedValueOnce({
      id: 20,
      title: "Um produto",
      price: 250,
      description: "produto de teste",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rate: 5,
      countRate: 300,
    });
    jest
      .spyOn(categoryRepository, "selectByName")
      .mockResolvedValueOnce([{ id: 2, name: "foods" }]);

    jest.spyOn(productRepository, "update").mockResolvedValueOnce({
      id: 20,
      title: "Um produto",
      price: 250,
      description: "produto de teste",
      category: "food",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rate: 5,
      countRate: 300,
    });

    jest.spyOn(productRepository, "selectByIdWithJoin").mockResolvedValueOnce({
      id: 20,
      title: "Um produto",
      price: 250,
      description: "produto de teste",
      category: "food",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rate: 5,
      countRate: 300,
    });

    const result = await productService.updateProduct(20, { category: "food" });

    expect(result).toMatchObject({ category: "food" });
  });

  it("Deleta um produto especifico", async () => {
    jest.spyOn(productRepository, "selectByIdWithJoin").mockResolvedValueOnce({
      id: 20,
      title: "Um Produto",
      price: 250,
      description: "produto de teste",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rate: 5,
      countRate: 300,
    });

    jest.spyOn(productRepository, "remove").mockResolvedValueOnce(1);

    const result = await productService.deleteProduct(20);

    expect(result).toMatchObject({
      message: "Product successfully deleted",
      prduct: {
        id: 20,
        title: "Um Produto",
        price: 250,
        description: "produto de teste",
        category: "electronics",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rate: 5,
        countRate: 300,
      },
    });
  });
});
