const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true,
    },
    name:{type:String,required:true},
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity:{
        type:Number,
        required:true,
        default:1,
    }
});
const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:"User",
        unique:true
    },
    items:[cartItemSchema],
    createdAt:{type: Date,default:Date.now}
});
module.exports = mongoose.model("Cart",cartSchema);