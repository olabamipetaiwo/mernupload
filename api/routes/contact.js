const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Contact = require("../models/contact");
const authMiddleware = require('../middleware/auth');
const {check,validationResult} = require("express-validator/check");


router.get('/:user',authMiddleware, async (req, res) => {
   try{
      const contacts = await Contact.find({
        user: req.params.user
      }).sort({date:-1});//most recent to least recent
      
      if(contacts ) {
        res.status(200).json({
          contacts:contacts
         });
      }else {
        res.status(500).json({
          msg:"User not found"
       });
      }
     
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
     contact:contact
    });
  } catch(err) {
    res.status(500).json({
      msg:"Server Error",
      err:err.message
   }); 
  }
});

router.patch('/:contact', authMiddleware , [
  check('name','name is required').not().isEmpty(),
  check('email','Invalid Email').not().isEmpty().isEmail(),
  check('password','Use password with 6 or more characters').not().isEmpty().isLength()
], async (req, res) => {

  let contactId = req.params.contact;
  try{
    const updatedContact = await Contact.findByIdAndUpdate(contactId,req.body,{new:true});
    res.status(200).json({
          msg:"Contact Updated",
          contact:updatedContact,
    });
  }catch(err) {
    res.status(500).json({
      msg:"Server Error",
      err:err.message
   }); 
  }
  
});

router.delete('/:contact', async (req, res) => {
  let contactId = req.params.contact;
 try {
    await Contact.findByIdAndRemove(contactId);
    res.status(200).json({
      msg:"Contact Deleted",
      contact:contactId
    });
 }catch(err) {
  res.status(500).json({
    msg:"Server Error",
    err:err.message
 }); 
}
});

module.exports = router;

