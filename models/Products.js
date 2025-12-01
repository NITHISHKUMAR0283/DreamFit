const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter product name'],
        trim: true,
        maxLength: [100, 'product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'please enter product price'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'please enter product description']
    },
    image: {
        type: String,
        required: [true, 'please enter image url']
    },
    stock: {
        type: Number,
        required: [true, 'please enter product stock'],
        default: 1
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    slug: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

ProductSchema.pre('save', function() {
    console.log("middleware is running");

    if (!this.isModified('name')) return ;

    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
    console.log("the created slug: " + this.slug);

});

module.exports = mongoose.model('Product', ProductSchema);
