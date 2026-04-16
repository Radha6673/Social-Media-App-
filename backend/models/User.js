const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true
  },
  profilepic:{
    type:String,
    default:""
  },
  followers:{
    type:Array,
    default:[]
  },
  follwings:{
    type:Array,
    default:[]
  }
},{timestamp:true});

module.exports = mongoose.model("User",userSchema);