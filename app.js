var express = require('express');

var userRouter = require('./routes/api/user');
var authRouter = require('./routes/api/auth');
var contactRouter = require('./routes/api/contact');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/contact', contactRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Runnning");
})

module.exports = app;
