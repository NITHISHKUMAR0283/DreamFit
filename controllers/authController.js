const User = require('../models/User');

exports.registerUser = async (req,res,next) => {
    try{
        const {name,email,password}= req.body;
        const user = await User.create({name,email,password});
        res.status(201).json({
            success: true,
            message:"user data added successfully(Password Hashed)",
            user: {id: user._id, name:user.name, email:user.email}
        });
    }catch(error){
        console.log(`Error during registration: ${error.message}`);
        if (error.code==11000){
            return res.status(400).json({success:false, message: "Email aldread registered. Please login or use a different email."});
        }
        res.status(500).json({success:false, message:"Registration Failed"});
    }
};
exports.loginUser = async (req,res,next) => {
    try{
        const {email,password}=req.body;
        if ( ! email || !password ){
            return res.status(400).json({success:false,message:"please enter the email and password"});
        }
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({success:false,message:"The user id is not found"});
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched){
            console.log("password is not matched"+password);
            return res.status(401).json({success:false,message:"Invalid email or  password "});
        }
        const token = user.getJwtToken();
        res.status(200).json({
            success:true,token,
            user:{ id :user._id,role:user.role,email:user.email}
        });
    }catch (error){
        console.log(`${error}`);
        res.status(500).json({success:false,message:"login failed."});
    }
};

exports.logout = async (req,res,next) => {
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message: 'logged out Successfully',
    });};