import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { createServer } from "http";
import Product from "./models/productModel.js";
import Cart from "./models/cartModel.js";
import mongoose from "mongoose";
import Order from "./models/orderModel.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World! 👋");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log("Error fetching products: ", error);
  }
});

app.post("/add-to-cart", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: "No cart available " });
    }

    const existingProduct = cart.cart.find(
      (item) => item.productId === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.cart.push({ productId: productId, quantity: quantity });
    }

    await cart.save();

    res.json({ message: "Cart updated successfully", cart: cart.cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/cart-count", async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const result = await Cart.aggregate([
      { $unwind: "$cart" },
      { $group: { _id: null, totalQty: { $sum: "$cart.quantity" } } },
    ]);
    const totalQuantity = result[0]?.totalQty || 0;
    res.json({ totalQuantity });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/cart", async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIds = cart.cart.map(
      (item) => new mongoose.Types.ObjectId(item.productId)
    );
    const products = await Product.find({ _id: { $in: productIds } });

    const cartWithDetails = cart.cart
      .map((cartItem) => {
        const product = products.find(
          (p) => p._id.toString() === cartItem.productId
        );
        if (!product) return null;
        return { ...product._doc, quantity: cartItem.quantity };
      })
      .filter((item) => item !== null);

    res.json(cartWithDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/cart/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.cart = cart.cart.filter((item) => item.productId !== productId);

    await cart.save();

    res.json({ message: "Product removed from cart", cart: cart.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/checkout", async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      {},
      { $set: { cart: [] } },
      { new: true }
    );
    if (!updatedCart)
      return res.status(404).json({ message: "Cart not found" });

    const newOrder = await Order.create({
      date: req.body.date,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      items: req.body.items,
      subtotal: req.body.subtotal,
      tax: req.body.tax,
      total: req.body.total,
    });

    res.json({
      message: "Cart emptied successfully and added order",
      order: newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const orders = await Order.findById(id);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/my-orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.log("Error fetching products: ", error);
  }
});

httpServer.listen(PORT, () => {
  console.log("Server starting at port " + PORT);
  connectDB();
});
