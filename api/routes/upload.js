const express = require('express');
const router = express.Router();
const multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
});


//Uploading SIngle file
// var upload = multer({ storage: storage }).single('file')
// router.post('/',(req,res) => {
//   upload(req, res, function (err) {
//       if (err instanceof multer.MulterError) {
//           return res.status(500).json(err)
//       } else if (err) {
//           return res.status(500).json(err)
//       }
//       return res.status(200).send(req.file)
//     })
// });

//uploading Multiple file
var upload = multer({ storage: storage }).array('file');
router.post('/',(req,res) => {
  upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
      } else if (err) {
          return res.status(500).json(err)
      }
      return res.status(200).send(req.file)
    })
 });
module.exports = router;
