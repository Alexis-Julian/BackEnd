import chai from "chai";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

const expect = chai.expect;
const requester = supertest("http://localhost:8080/");

describe("TEST API", () => {
  describe("ENDPOINT Cart", async () => {
    it("GET trea un producto por id", async () => {
      const cartId = "";
      const response = await requester.get(`api/cart/${cartId}`);

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { status, _body } = response;
      expect(status).to.equal(200);
    });

    it("POST crea un carrito automatico", async () => {
      const response = await requester.post(`api/cart`);
      if (response.error) {
        throw new Error(response.error.message);
      }

      const { status, _body } = response;
      expect(status).toEqual(200);
    });

    it("POST agrega un producto especificado a un carrito especificado", async () => {
      const productId = "";
      const cartId = "";

      const response = await requester.post(`api/cart/${cartId}/product/${productId}`);
      if (response.error) {
        throw new Error(response.error.message);
      }

      const { status, _body } = response;
      expect(status).toEqual(200);
    });

    it("PUT elimina la todos los productos del carrito", async () => {
      const cartId = "";
      const response = await requester.put(`api/cart/${cartId}`);
      if (response.error) {
        throw new Error(response.error.message);
      }
      const { status, _body } = response;
      expect(status).toEqual(200);
    });
  });

  describe("ENDPOINT Products", async () => {
    it("GET", async () => {
      const response = await requester.get("api/products");
      if (response.error) {
        throw new Error(response.error.message);
      }
      const { status, _body } = response;
      expect(status).to.equal(200);
      expect(_body.result.docs).to.be.an.instanceof(Array);
    });

    it("DELETE", async () => {
      const idRemove = "64a6f2f959a460c6f871dbf5";

      const response = await requester.delete(`api/products/${idRemove}`);

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { status, _body } = response;

      expect(_body.result).to.be.an.property("_id");

      expect(status).to.equal(200);
    });

    it("POST", async () => {
      const productCreate = {
        title: "Remea",
        description: "Description",
        price: 200,
        code: "473ID3",
        stock: 30,
        status: true,
        category: "Ropa",
      };
      const response = await requester.post(`api/products`).send(productCreate);

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { status, _body } = response;
      expect(status).to.equal(200);

      expect(_body.result).to.be.an.property("_id");
    });

    it("PUT", async () => {
      const productId = "64a6f2f959a460c6f871dbf9";

      const productUpdate = {
        stock: 30,
        status: true,
        category: "Electronica",
      };

      const response = await requester.put(`api/products/${productId}`).send(productUpdate);

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { status, _body } = response;
      expect(status).to.equal(200);

      expect(_body.result).to.be.an.property("_id");
    });
  });

  describe("ENDPOINT Sessions", async () => {
    /* Tengo mal los contraladores en proceso de arreglado */
  });
});
