const jwt = require('jsonwebtoken')
const user = require('../models/User')

exports.isAuthenticatedUser = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        console.log(authHeader)
        return res.status(401).json({
            success:false,
            message:'Login first to access this resource. Token is missing or invalid Token'
        })
    }
    try{
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await user.findById(decoded.id);

    next();}
    catch(error){
        res.status(401).json({success:false,message:'Invalid or expired token'});
    }
};
exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message: `Role (${req.user.role}) is not allowed to access this resource.`
            });
        }
        next();
    };
};