//express
import express from "express";
const router = express.Router();
//login
import checkUser from "../controllers/login.js";
//register
import register from "../controllers/register.js";
//product
import addProduct from "../controllers/product.js"

router.post("/register", register);
router.post("/login", checkUser);
router.post("/addproduct", addProduct);



export default router;
