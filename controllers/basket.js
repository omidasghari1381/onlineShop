//basket
import basket from "../models/basket.js";
//product
import productModel from "../models/product.js";

export async function addToCart(req, res) {
  const { productId, quantity } = req.body;

  try {
    const product = await productModel.findById(productId);
    if (!product)
      return res.status(404).json({ message: "couldn't find the product" });
    if (product.stock < quantity) {
      return res.status(400).json({ message: "insufficient inventory" });
    }

    let cart = await basket.findOne({ userId: req.userId.id });
    if (cart) {
    }
    if (!cart) {
      cart = new basket({
        userId: req.userId.id,
        items: [],
      });
    }
    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );
    if (existingItem) {
      if (cart.items.quantity > product.stock) {
        return res.status(400).json({ message: "insufficient inventory" });
      }
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        price: product.price,
      });
    }
    product.stock -= quantity;
    await product.save();
    await cart.save();
    res.status(200).json({ message: "product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "something went wrong 1", error });
  }
}

export async function removeFromCart(req, res) {
  const { productId, userId } = req.body;

  try {
    const cart = await basket.findOne({ userId });

    if (!cart)
      return res.status(404).json({ message: "Couldn't find the cart" });

    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    const item = cart.items[itemIndex];
    const product = await productModel.findById(productId);
    product.stock += item.quantity;

    cart.items.splice(itemIndex, 1);
    await product.save();
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
    if (!cart) return res.status(404).json({ message: "cart is empty" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "something went wrong 3", error });
  }
}

export async function updateQuantity(req, res) {
  const { productId, quantity, userId } = req.body;
  try {
    const cart = await basket.findOne({ userId });
    if (!cart)
      return res.status(404).json({ message: "couldn't find the cart" });

    const item = cart.items.find((item) => item.productId.equals(productId));
    if (!item)
      return res.status(404).json({ message: "product not found in cart" });

    const product = await productModel.findById(productId);
    if (product.stock + item.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient inventory" });
    }
    product.stock += item.quantity - quantity;
    item.quantity = quantity;

    await product.save();
    await cart.save();

    res.status(200).json({ message: "quantity updated", cart: cart });
  } catch (error) {
    res.status(500).json({ message: "something went wrong 4", error });
  }
}

export async function clearCart(req, res) {
  try {
    const cart = await basket.findOne({ userId: req.body.userId });
    if (!cart) return res.status(404).json({ message: "couldn't find cart" });

    for (const item of cart.items) {
      const product = await productModel.findById(item.productId);
      if (product) product.stock += item.quantity;
      await product.save();
    }

    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong 5", error });
  }
}
