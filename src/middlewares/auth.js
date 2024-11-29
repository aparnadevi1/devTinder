const jwt = require("jsonwebtoken");
const User=require("../models/user");

const bcrypt = require("bcrypt");

const userAuth=async(req,res,next)=>{


    try{
       //read the token from the req cookies


     const cookies=req.cookies;
     const {token}=cookies;
     //validate the token
     if(!token)
     {
        throw new Error("Token is Not Valid");
     }

     const decodedObj=await jwt.verify(token,"dvsnfdmbsmsdcsd");
     const{_id}=decodedObj;
     const user=await User.findById(_id);
     if(!user)
     {
        throw new Error("User Not Found");
     }
     req.user=user;
     next();

     //find the user
    }
    catch(err)
    {
        res.status(400).send("Something went wrong"+err.message);
    }
     
};
module.exports={
   userAuth
}