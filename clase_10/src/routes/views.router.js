import { Router } from "express";
import { products } from "../app.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    style: "styles.css",
    existProducts: products.length > 0,
    products: products,
  });
});

router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", {
    style: "styles.css",
    existProducts: products.length > 0,
    products: products,
  });
});
export default router;
