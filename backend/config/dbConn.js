const mongoose = require('mongoose');

const connectDb = async() => {
    try{
       mongoose.connect(process.env.DATABASE_URI)

    } catch(err){
        console.log('Connection Error', err);
    }
};

module.exports = connectDb;