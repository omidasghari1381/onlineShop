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
import addTag from "../controllers/tags.js";
//category
import addCategory from "../controllers/category.js";
//auth
import auth from "../middleware/auth.js";
//isAdmin
import isAdmin from "../middleware/isAdmin.js";
//basket
import {
  addToCart,
  removeFromCart,
  viewCart,
  updateQuantity,
  clearCart,
} from "../controllers/basket.js";

router.post("/register", register);
router.post("/login", checkUser);
router.post("/addproduct", auth, isAdmin, addProduct);
router.post("/addtag", auth, isAdmin, addTag);
router.post("/addcategory", auth, isAdmin, addCategory);
router.post("/addtocart", auth, addToCart);
router.post("/removefromcart", auth, removeFromCart);
router.post("/viewcart", auth, viewCart);
router.post("/updatequantity", auth, updateQuantity);
router.post("/clearcart", auth, clearCart);



export default router;
