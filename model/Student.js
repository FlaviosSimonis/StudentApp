var mongoose = require('mongoose');
var uniqueValidator = require ('mongoose-unique-validator');

require("dotenv").config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once("open", ()=>{
  console.log("Connected to Database(student collection) successfully");
});

var Schema = mongoose.Schema;

var studentSchema = new Schema({
  firstname: {
    type:String, 
    required:[true, 'Firstname is required'],
  },
  lastname: {
    type:String, 
    required:[true, 'Lastname is required'],
  }
});

studentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Student', studentSchema);


