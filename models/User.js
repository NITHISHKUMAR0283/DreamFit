const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'please enter your name'],
        maxLength: [50,'Name cannot exceeds 50 characters']
    },
    email:{
        type: String,
        required: [true,'please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true,'please enter your password'],
        minLength: [6,'password must be atleast 6 characters'],
        select: false
    },
    role:{
        type:String,
        default:'user'
    },
},{
    timestamps:true
});

userSchema.methods.getJwtToken = function(){
    return jwt.sign(
        {id:this.id,role:this.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE_TIME}
    );
}
userSchema.methods.comparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);

}
userSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return;
    }
    this.password = await bcrypt.hash(this.password, 10 );

})
module.exports = mongoose.model('User',userSchema);