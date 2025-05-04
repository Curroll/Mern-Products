import express from "express";

import { createProducts, deleteProducts, getProducts, updateProducts } from "../controller/product.controller.js";

const router = express.Router();


router.post("/",createProducts);

router.get("/", getProducts)

router.put("/:id", updateProducts);

router.delete("/:id", deleteProducts)



export default router;