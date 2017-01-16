var express = require('express');
var router = express.Router();
var path = require('path');
var User_model= require('../models/user.js');
var formidable = require('formidable');
var jwt=require('jwt-simple');

var config= require('../config/database.js');
var passport= require('passport');
// pass passport for configuration
require('../config/passport')(passport);
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname+'/index.html'))
});


router.post('/register', function(req,res,next){
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

      if(err){
        return res.json(err.message);
      } else{
        var token = jwt.encode(user, config.secret);
        // return the information including token as JSON
        console.log(token);
        res.json({success: true, token: 'JWT ' + token});
      }

    });
  } else {
    res.json(err.message);
  }

});

router.post('/authenticate', function(req, res) {
  console.log(req.body.email + req.body.password);
 User_model.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
     console.log(err);
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // if user is found and password is right create a token
           var token = jwt.encode(user, config.secret);
           // return the information including token as JSON
           console.log(token);
           res.json({success: true, token: 'JWT ' + token});

    }
  });
});




router.get('/userinfo',passport.authenticate('jwt',{session:false}),function(req,res){
  var token =getToken(req.headers);
    console.log(token);

  if (token){
    var decoded= jwt.decode(token,config.secret);
    User_model.findOne({firstname:decoded.firstname},function(err,user){
      if(err){
        throw err;
      }
      if(!user){
        return res.status(403).send({success:false,msg:'Authentication failed'})
      } else{
          //console.log(user);

        res.json({sucess:true,msg:'Welcome in the members',user:user});
      }
    });
  } else{
    return res.status(403).send({sucess:false,msg:'No Token provided.'});
  }
});

getToken= function(headers){
  if(headers&& headers.authorization){
    var parted= headers.authorization.split(' ');
    if(parted.length=== 2){
      return parted[1];
    } else{
      return null;
    }} else{
      return null;
    }
  };


module.exports = router;
