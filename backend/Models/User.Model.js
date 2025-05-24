const mongoose = require('mongoose');


const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String, // bsontype: "String"
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        isEmail: true,

    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,

    },


})


const User = mongoose.model('User', userSchema);



module.exports = User;







    

