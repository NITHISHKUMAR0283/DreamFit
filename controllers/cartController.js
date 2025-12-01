const jwt = require("jsonwebtoken")
const User  = require("../models/User")
const Cart  = require ("../models/Cart");
const Products = require("../models/Products");
exports.addUserCart =async (req,res,next)=>{
    try {
        const{productId,quantity} = req.body;
        const userId = req.user._id;
        const product = await Products.findById(productId).select("name price images");
        if (!product){
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }
        const item ={
            product:productId,
            name :product.name,
            image:product.images|| 'placeholder.jpg',
            price:product.price,
            quantity:quantity
        }
        let cart = await Cart.findOne({user:userId});
        if(!cart){
            cart = Cart.create({
                user:userId,
                item:[item]
            })
        
        res.status(200).json({
            success:true,
            message:`Successfully created the cart for user and added the product ${cart}`
        })
    }   else{
        const isItemExist = cart.items.findIndex(i=>i.product.toString() === productId);
        if(isItemExist>-1){
            cart.item[isItemExist].quantity+=1
            cart.markModified('items')
        }
        else{
            cart.items.push(item);
        }
    }
    await cart.save();
    res.status(200).json({
            success: true,
            message: 'Item added to cart successfully!',
            cart
        });
}
    catch(error){
        next(error)
    }
}
exports.getUserCart = async (req,res,next)=>{
    try{
        const userId=req.user._id;
        const cart = await Cart.findOne({user:userId}).populate("items.product","name price stock images");
        if(!cart){
            return res.status(200).json({ 
                success: true, 
                message: "Cart is empty.",
                cart: { items: [] } 
            });
    }
    res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        next(error); 
    }
}