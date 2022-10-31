var mongoose = require('mongoose');
var uniqueValidator = require ('mongoose-unique-validator');

require("dotenv").config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once("open", ()=>{
  console.log("Connected to Database(courses collection) successfully");
});

const Schema = mongoose.Schema;

const coursesSchema = new Schema({
  name:{
    type:String,
    required:[true, 'name is required'],
  },
  description:{
    type:String
  },
  teacher:{
    type: String,
    default: ""
  },
  student:{
    type: [ String ],
    default: []
  }
});

coursesSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Courses', coursesSchema);




