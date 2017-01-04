var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema=Schema({
  firstname:String,
  lastname:String,
  email:String,
  profile_url:String,
  password:String,
  dob:String
});


var user=mongoose.model('user',userSchema,'Users');

module.exports= user;
