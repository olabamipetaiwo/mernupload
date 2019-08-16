const mongoose = require("mongoose");
// const config = require("config");
const config =require("./config");
// const db = config.get("mongoURI");
const localDb = config.localMongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(localDb, {
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        console.log("``Connected to database"+localDb+"succesfully");
    }catch(err) {
        console.log(err);
        console.log("Error occured connecting to Database");
        process.exit(1);
    }
};

module.exports= connectDB;

