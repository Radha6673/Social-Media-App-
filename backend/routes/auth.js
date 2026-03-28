const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//REGISTER ROUTE
router.post("/register",async(req,res) => {
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    
    const newUser = new User ({
      username : req.body.username,
      email:req.body.email,
      password:hashedPassword
    });
    
    const user = await newUser.save();
    
    res.status(200).json(user);
  }
  catch(err){
    console.log("registering unsuccesful",err);
    res.status(500).json(err);
  }
})

//LOGIN ROUTE
router.post("/login",async(req,res) => {
  try{
     const user = await User.findOne(
       {email:req.body.email});
    if (!user) return res.status(404).json("user not found");
    
     const validpassword = await bcrypt.compare(req.body.password,user.password);
     if(!validpassword) return res.status(400).json("incorrect password");
    
    const token = jwt.sign({id:user._id,
      username:user.username},
      process.env.jwtsecretkey,
      {
        expiresIn:"5d"
      }
    );
    
    res.status(200).json(token);
  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;