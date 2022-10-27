var mongoose = require('mongoose');
var uniqueValidator = require ('mongoose-unique-validator');

require("dotenv").config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once("open", ()=>{
  console.log("Connected to Database(courses collection) successfully");
});

var Schema = mongoose.Schema;

var coursesSchema = new Schema(

  {
    name:{
      type:String,
      required:[true, 'name is required'],
          },
    description:{
      type:String
          },
    teacher:{
      firstname: {
        type:String, 
      },
      lastname: {
        type:String, 
      }
            },
    student:
    [
      {
      firstname: {
        type:String, 
                  },
      lastname: {
        type:String, 
                }
      },
      {
      firstname: {
        type:String, 
                },
      lastname: {
        type:String, 
                }
      }
    ]
  }
);

coursesSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Courses', coursesSchema);




