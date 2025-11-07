import mongoose from "mongoose";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";


export async function seedData() {

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany([
    { name: 'Wireless Headphones', price: 79.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', category: 'Electronics' },
    { name: 'Smart Watch', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', category: 'Electronics' },
    { name: 'Laptop Backpack', price: 49.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', category: 'Accessories' },
    {  name: 'Coffee Maker', price: 89.99, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop', category: 'Home' },
    {  name: 'Running Shoes', price: 129.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', category: 'Fashion' },
    {  name: 'Desk Lamp', price: 39.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', category: 'Home' },
    {  name: 'Sunglasses', price: 159.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', category: 'Fashion' },
    { name: 'Bluetooth Speaker', price: 59.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', category: 'Electronics' },
  ]);
    console.log("✅ Default products added");
  } else {
    console.log("⚡ Products already exist — skipping seeding");
  }

  const cartCount = await Cart.countDocuments();
  if (cartCount === 0) {
    await Cart.create({ cart: [] });
    console.log("✅ Empty cart created");
  } else {
    console.log("⚡ Cart already available");
  }

  
}

