const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId:{
    type:String,
    require:true
  },
})