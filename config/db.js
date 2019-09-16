const mongoose = require("mongoose");
const config = require("config");
const localDb = config.get("localMongoURI");

const db = config.get("mongoURI");

const connectDB = async () => {
    try {
       await mongoose.connect(localDb, {
        // await mongoose.connect(db, {
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false
        });


        console.log("``Connected to database"+db+" with mongoclient succesfully");
    }catch(err) {
        console.log(err);
        console.log("Error occured connecting to Database");
        process.exit(1);
    }
};

module.exports= connectDB;



