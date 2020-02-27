const express = require('express');
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path")

const uploadRouter = require('./api/routes/upload');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.use('/api/upload', uploadRouter);

//server static assets in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*',(req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')));
}

// const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server Runnning efficiently on: ",PORT);
})

module.exports = app;
