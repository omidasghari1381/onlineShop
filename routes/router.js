//express
import express from "express";
const router = express.Router();
//login
import checkUser from "../controllers/login.js";
//register
import register from "../controllers/register.js";
//product
import addProduct from "../controllers/product.js"
//tags
import tagsModel from "../controllers/tags.js";

router.post("/register", register);
router.post("/login", checkUser);
router.post("/addproduct", addProduct);
router.post("/addtag", tagsModel);


export default router;
