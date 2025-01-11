//basket
import basket from "../models/basket.js";
//product
import productModel from "../models/product.js";
//mongoose
import mongoose from "mongoose";

export async function addToCart(req, res) {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "couldn't find the product" });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: "insufficient inventory" });
    }
    let cart = await basket.findOne({ userId: req.userId.id });
    if (cart) {
      if (cart.items.quantity > product.stock) {
        return res.status(400).json({ message: "insufficient inventory" });
      }
    }
    if (!cart) {
      cart = new basket({
        userId: req.userId.id,
        items: [],
      });
    }
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      product.stock -= quantity;
      existingItem.quantity += quantity;
    } else {
      product.stock -= quantity;
      cart.items.push({
        productId: productId,
        quantity: quantity,
        price: product.price,
      });
    }
    await cart.save();
    res.status(200).json({ message: "product added to cart", basket: cart });
  } catch (error) {
    res.status(500).json({ message: "something went wrong 1", error });
  }
}

export async function removeFromCart(req, res) {
  const productId = req.body.productId;
  const userId = req.body.userId;

  try {
    const cart = await basket.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!cart) {
      return res.status(404).json({ message: "Couldn't find the cart" });
    }

    const product = new mongoose.Types.ObjectId(productId);
    const item = cart.items.find((item) => item.productId.equals(product));

    if (!item) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    cart.items = cart.items.filter((item) => !item.productId.equals(product));
    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Something went wrong 2", error });
  }
}

export async function viewCart(req, res) {
  try {
    const cart = await basket
      .findOne({ userId: req.body.userId })
      .populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "cart is empty" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "something went wrong 3", error });
  }
}

export async function updateQuantity(req, res) {
  const { productId, quantity } = req.body;
  try {
    const cart = await basket.findOne({ userId: req.body.userId });
    if (!cart) {
      return res.status(404).json({ message: "couldn't find the cart" });
    }
    console.log(cart);
    const item = cart.items.find((item) => item.productId.equals(productId));

    console.log(item);
    if (!item) {
      return res.status(404).json({ message: "basket is empty" });
    }

    const product = await productModel.findById(productId);
    if (product.stock < quantity) {
      return res.status(400).json({ message: "insufficient inventory" });
    }
    if (cart.items.quantity > product.stock) {
      return res.status(400).json({ message: "insufficient inventory" });
    }
    await cart.save();
    res.status(200).json({ message: "product added to basket", cart: cart });
  } catch (error) {
    res.status(500).json({ message: "something went wrong 4", error });
  }
}

export async function clearCart(req, res) {
  try {
    const cart = await basket.findOne({ userId: req.body.userId });
    if (!cart) {
      return res.status(404).json({ message: "couldn't find cart" });
    }

    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "cart is now empty" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong 5", error });
  }
}
