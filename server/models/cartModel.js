import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cart : {
        type : [{
        productId : String,
        quantity : Number
    }],
        default : []
    },

});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart