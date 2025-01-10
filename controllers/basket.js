//basket
import basket from "../models/basket.js";
//product
import productModel from "../models/product.js";

export async function addToCart(req, res) {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  try {
    // بررسی وجود محصول
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "couldn't find the product" });
    }
    // بررسی موجودی محصول
    if (product.stock < quantity) {
      return res.status(400).json({ message: "insufficient inventory" });
    }
    // پیدا کردن یا ایجاد سبد خرید کاربر
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

    // بررسی اینکه آیا محصول در سبد وجود دارد یا نه
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice += product.price * quantity;
      for (let i = 0; i < quantity; i++) {
        cart.totalPrice += product.price;
      }
    } else {
      cart.items.push({
        productId: productId,
        quantity: quantity,
        price: product.price,
      });
      for (let i = 0; i < quantity; i++) {
        cart.totalPrice += product.price;
      }
    }

    // ذخیره سبد خرید
    await cart.save();
    res.status(200).json({ message: "product added to basket", basket: cart });
  } catch (error) {
    res.status(500).json({ message: "something went wrong 1", error });
  }
}

// حذف آیتم از سبد خرید
export async function removeFromCart(req, res) {
  const productId = req.body.productId;
  try {
    const cart = await basket.findOne({ userId: req.body.userId });
    console.log(cart);

    if (!cart) {
      return res.status(404).json({ message: "couldn't find the basket" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    console.log(cart);
    await cart.save();
    res
      .status(200)
      .json({ message: "product got removed from basket", cart: cart });
  } catch (error) {
    res.status(500).json({ message: "something went wrong 2", error });
  }
}

export async function viewCart(req, res) {
  try {
    const basket = await basket
      .findOne({ user: req.userId })
      .populate("items.product");
    if (!basket) {
      return res.status(404).json({ message: "basket is empty" });
    }
    res.status(200).json(basket);
  } catch (error) {
    res.status(500).json({ message: "something went wrong 3", error });
  }
}

// به‌روزرسانی تعداد آیتم
export async function updateQuantity(req, res) {
  const { productId, quantity } = req.body;

  try {
    const basket = await basket.findOne({ user: req.userId });
    if (!basket) {
      return res.status(404).json({ message: "couldn't find the basket" });
    }

    const item = basket.items.find(
      (item) => item.productModel.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ message: "basket is empty" });
    }

    // بررسی موجودی
    const product = await productModel.findById(productId);
    if (product.stock < quantity) {
      return res.status(400).json({ message: "insufficient inventory" });
    }

    item.quantity = quantity;
    basket.totalPrice += product.price;
    await basket.save();
    res.status(200).json({ message: "product added to basket", cart: basket });
  } catch (error) {
    res.status(500).json({ message: "something went wrong 4", error });
  }
}

// خالی کردن سبد خرید
export async function clearCart(req, res) {
  try {
    const basket = await basket.findOne({ user: req.userId });
    if (!basket) {
      return res.status(404).json({ message: "couldn't find basket" });
    }

    basket.items = [];
    basket.totalPrice = 0;
    await basket.save();
    res.status(200).json({ message: "basket is empty", cart: basket });
  } catch (error) {
    res.status(500).json({ message: "something went wrong 5", error });
  }
}

