const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "Name is required"],
  },
  email:{
    type:String,
    required:[true, "Name is required"],
  },
  password:{
    type:String,
    required:[true, "Name is required"],
  }
})
