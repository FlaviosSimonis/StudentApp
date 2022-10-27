var mongoose = require('mongoose');
var uniqueValidator = require ('mongoose-unique-validator');

require("dotenv").config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once("open", ()=>{
  console.log("Connected to Database(teacher collection) successfully");
});

var Schema = mongoose.Schema;

var teacherSchema = new Schema({
  firstname: {
    type:String, 
    required:[true, 'Firstname is required'],
  },
  lastname: {
    type:String, 
    required:[true, 'Lastname is required'],
  }
});

teacherSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Teacher', teacherSchema);


