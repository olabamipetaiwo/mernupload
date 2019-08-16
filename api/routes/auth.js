const express = require('express');
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const router = express.Router();
const User = require("../models/user");
const {check,validationResult} = require("express-validator/check");
const authMiddleware = require('../middleware/auth');


router.get('/',authMiddleware, async (req, res) => {
 try {
   const user = await User.findById({id:req.user.id}).select('-password');
   res.status(200).json({
      msg:"You are Authenticated",
      user:user
   });
 } catch(err) {
    res.status(500).json({
      msg:"Server Error"
    });
 }
});

router.post('/', [
  check('email','Please include Email').not().isEmpty().isEmail(),
  check('password','Please include your passsword').not().isEmpty().exists()
], async (req, res) => {
  if(!errors.isEmpty) {
    return res.status(400).json({
      errors:errors.array()
    });
  }
  const {name,email,password} = req.body;
  try {
    let user = await User.findOne({email:email});
       if(user) {
          const passwordCheck = await user.validatePassword(password,user.password);
          if(!passwordCheck) {

          return res.status(404).json({
              msg:"Incorrect password"
             });
          }
          const payload = {
            user: {
              id:user.id
            }
          }
          const jwtKey = config.jwtKey;
          const expireTime = 60*60*24*7;
          jwt.sign(payload,jwtKey,{
            expiresIn:expireTime
          }, (err,token) => {
            res.status(200).json({
              msg:"Authenticated Succesfully",
              token:token
            });
          });


        }else {
          return res.status(404).json({
            msg:"Email not found"
           });
        }
  }catch(err) {
    res.status(500).json({
      msg:"Server Error"
   }); 
  }
});

module.exports = router;
