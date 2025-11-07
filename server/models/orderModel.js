import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    items : {
        type : [{
        productId : String,
        quantity : Number,
        name : String,
        price : Number,
        image : String,
        category : String,
    }],
    },
    date: String,
    customerName: String,
    customerEmail: String,
    subtotal: Number,
    tax: Number,
    total: Number
});

const Order = mongoose.model("Order",orderSchema);
export default Order