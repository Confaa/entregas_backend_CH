import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();

let p1 = new ProductManager();

router.get("/", async (req, res) => {
  try {
    let productos = await p1.sendProducts();

    if (req.query.limit) {
      productos = productos.slice(0, req.query.limit);
    }
    res.send(productos);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    let producto = await p1.getProductById(parseInt(req.params.pid));
    res.send(producto);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  let response = await p1.addProduct(
    req.body.title || "Sin titulo",
    req.body.description || "Sin descripcion",
    req.body.price || 0,
    req.body.thumbnail || ["Sin imagen"],
    req.body.code || "Sin codigo",
    req.body.stock || 0,
    req.body.category || "Sin categoria",
  );
  res.send(response);
});

router.put("/:pid", async (req, res) => {
  try {
    let updateProduct = await p1.getProductById(parseInt(req.params.pid));

    updateProduct = updateProduct[0];
    updateProduct = {
      id: updateProduct.id,
      ...req.body,
    };
    console.log(updateProduct);
    let response = await p1.updateProduct(updateProduct);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    let response = await p1.deleteProduct(parseInt(req.params.pid));
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});
export default router;
