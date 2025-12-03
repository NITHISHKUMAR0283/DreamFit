const Product = require( '../models/Products');
const APIFeatures = require("../utils/APIFeatures")
exports.createNewProduct= async (req,res,next) =>{
    try{
        const {name,price,description,image,stock}=req.body;

        const product=await Product.create({
            name,
            price,
            description,
            image,
            stock,
            user:"60c72b2f9b1d7d2c388d7211"
        });

        res.status(201).json({
            success:true,
            message:"product added successfully",
            product
        });
        
    }catch(err){
        console.log(`cant create product ${err.message}`);
        res.status(500).json({
            success:false,
            message: "failed to create product due to server error or validation"
        });
            
        }

};

exports.updateProduct = async (req,res,next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        res.status(404).json({success:false,message:"product not found"});

    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,product:product.toObject()
    })
}

exports.deleteProduct = async (req,res,next) => {
    try{
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });        
    }
    await Product.findByIdAndDelete(req.params.id)
       
    res.status(200).json({
        success:true,
        message: "product Deleted Sucessfully"
    });

}
catch(error){
    next(error);
}}

exports.getAdminProducts = async (req,res,next) =>{
    try{
        const product = await Product.find();

        res.status(200).json({
            success:true,
            count:products.length,
            products
        }
        );
    }
    catch(error){
        next(error);
    }
}
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id); 

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        next(error); 
    }
};
exports.getProducts = async (req,res,next)=>{
    try{
        const num_page=20
        if (req.query && req.query.page){
            console.log(req.query.page)
            const num_page=req.query.page;
        }
        const resultPerPage = num_page ;
        const productCount = await Product.countDocuments();

        const apiFeatures  = new APIFeatures(Product.find(),req.query)
                                            .search().filter().pagination(resultPerPage);
        console.log(apiFeatures)
        const products = await apiFeatures.query;
        res.status (200).json({
            success:true,
            productCount:productCount,
            products,
        }
        );    
    }catch(error){
        next(error);
    }
};