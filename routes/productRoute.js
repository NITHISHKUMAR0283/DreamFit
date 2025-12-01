const express= require('express')
const {createNewProduct,updateProduct,deleteProduct,getAdminProducts,getSingleProduct} = require("../controllers/productController");
const {isAuthenticatedUser,  authorizeRoles} = require ('../middleware/auth')
const router = express.Router();

router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),createNewProduct);
router.route('/admin/product/:id')
    .get(isAuthenticatedUser,authorizeRoles('admin'),getSingleProduct)
    .put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);
router.route('/admin/Products').get(isAuthenticatedUser,authorizeRoles('admin'),getAdminProducts);
module.exports = router;