const express = require('express');
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const router = express.Router();
const User = require("../models/user");
const {check,validationResult} = require("express-validator/check");
const authMiddleware = require('../middleware/auth');
const bcrypt = require("bcrypt");


router.get('/',authMiddleware, async (req, res) => {
 try {
   let user = await User.findById(req.user.id).select('-password');
   if(user) {
      res.status(200).json({
        msg:"You are Authenticated",
        user:user
    });
   }else {
      res.status(400).json({
        msg:"No User found"
      });
   }
  
 } catch(err) {
    res.status(500).json({
      msg:"Server Error in Auth user Route",
      err:err.message
    });
 }
});

router.post('/', [
  check('email','Please include Email').not().isEmpty().isEmail(),
  check('password','Please include your passsword').not().isEmpty().exists()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty) {
    return res.status(400).json({
      errors:errors.array()
    });
  }
  const {name,email,password} = req.body;
  try {
    let user = await User.findOne({email:email});
       if(user) {
          const passwordCheck = await bcrypt.compare(password,user.password);
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
            if(err) throw err;
            res.status(200).json({
              msg:"Authenticated Succesfully",
              token:token,
              id:user.id
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
