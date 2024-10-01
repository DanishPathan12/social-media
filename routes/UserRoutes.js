const express=require("express");
const user=require("../models/users");
const router=express.Router();
const {handleUserSignUp,handleUserLogin}=require("../controllers/controller_user")

router.post("/signup",handleUserSignUp);

router.post('/login',handleUserLogin);

module.exports=router;