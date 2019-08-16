const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Contact = require("../models/contact");
const authMiddleware = require('../middleware/auth');
const {check,validationResult} = require("express-validator/check");


router.get('/', authMiddleware ,async (req, res) => {
   try{
      const contacts = await Contact.find({
        user: req.user.id
      }).sort({date:-1});//most recent to least recent
      res.status(200).json({
       contacts:contacts
      });
    }catch(err) {
      res.status(500).json({
        msg:"Server Error"
     });
    }
});

router.post('/',authMiddleware , [
  check('name','name is required').not().isEmpty()
 ], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty) {
    return res.status(400).json({
      errors:errors.array()
    });
  }
  const {name,email,phone,type} = req.body;
   try{
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user:req.user.id
    });
    const contact = await newContact.save();
    res.status(200).json({
     contacts:contact
    });
  } catch(err) {
    res.status(500).json({
      msg:"Server Error"
   }); 
  }
});

router.put('/:id', authMiddleware , [
  check('name','name is required').not().isEmpty(),
  check('email','Invalid Email').not().isEmpty().isEmail(),
  check('password','Use password with 6 or more characters').not().isEmpty().isLength()
], async (req, res) => {
  let contactId = req.params.id;
  res.json('contact route working');
});

router.delete('/', async (req, res) => {
  res.json('contact route working');
});

module.exports = router;
