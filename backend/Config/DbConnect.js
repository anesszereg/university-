const mongoose = require('mongoose');




const Dbconfig =async () => {

    try{

        await mongoose.connect('mongodb://localhost:27017/bookStore')

        console.log('MongoDB connected successfully');


    }catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }





}


module.exports = Dbconfig;