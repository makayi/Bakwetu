var express = require('express');
var router = express.Router();
var path = require('path');
var User_model= require('../models/user.js');
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname+'/index.html'))
});


router.post('/create', function(req,res,next){
//   var firstname,lastname,password;
//   var form = new formidable.IncomingForm();
//   form.parse(req);
//   form.on('field',function(name,value){
//
//    // get the data from the form sent through a body
//     if(name=="firstname"){
//       firstname=value;
//     } else if (name=="lastname") {
//       lastname=value;
//     } else if (name=="password") {
//       password= value;
//
//     }
//
// console.log(firstname+ "-" + lastname + password);
//
//   }
//
// );
 console.log(req.body.password);
  console.log(req.body.email);
  var user= new User_model({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    password:req.body.password,
    email:req.body.email
  });

  if(user!=null){
    user.save(function(err,user){
      var response = {
        status: 200,
        message: "Post has been saved",
        post: user
      };

      if(err){
        return res.json(err.message);
      } else{
        res.json(response);
      }

    });
  } else {
    res.json(err.message);
  }

});

module.exports = router;
