//express
import express from "express";
const router = express.Router();
//login
import checkUser from "../controllers/login.js";
//register
import register from "../controllers/register.js";
//product
import addProduct from "../controllers/product.js";
//tags
import tagsModel from "../controllers/tags.js";
//auth
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

router.post("/register", register);
router.post("/login", checkUser);
router.post("/addproduct", auth, isAdmin, addProduct);
router.post("/addtag", auth, isAdmin, tagsModel);

export default router;
