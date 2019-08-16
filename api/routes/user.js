const express = require('express');
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const router = express.Router();
const User = require("../models/user");
const {check,validationResult} = require("express-validator/check");

/* GET users listing. */
router.get('/', [
  check('name','name is required').not().isEmpty(),
  check('email','Invalid Email').not().isEmpty().isEmail(),
  check('password','Use password with 6 or more characters').not().isEmpty().isLength()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty) {
    return res.status(400).json({
      errors:errors.array()
    });
  }
  const {name,email,password} = req.body;
    try {
       const user = await User.findOne({email:email});
       if(user) {
          return res.status(400).json({
           msg:"User already exists"
          });
        }
        user = new User({
          name:name,
          email:email,
          password:user.encryptPassword(password)
        });

        await user.save();
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
            msg:"Succesful Registration",
            token:token
          });
        });
    }catch(err) {
      res.status(500).json({
         msg:"Server Error"
      });
    }
});

module.exports = router;
