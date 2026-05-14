import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Session from "../models/sessionModel.js";
import token from "../Utils/Token.js";

export const register=async(req,res)=>{
 const hash=await bcrypt.hash(req.body.password,10);

 const user=await User.create({
  ...req.body,
  password:hash
 });

 res.json({
  access:token.access(user),
  refresh:token.refresh(user)
 });
};

export const login=async(req,res)=>{
 const user=await User.findOne({email:req.body.email});

 const match=await bcrypt.compare(
   req.body.password,
   user.password
 );

 if(!match) return res.status(400).json({msg:"Invalid"});

 const refresh=token.refresh(user);

 await Session.create({
   userId:user._id,
   refreshToken:refresh
 });

 res.json({
   access:token.access(user),
   refresh
 });
};

export const logout=async(req,res)=>{
 await Session.deleteMany({userId:req.user.id});
 res.json({msg:"Logged out"});
};

export const me=async(req,res)=>{
 const user=await User.findById(req.user.id);
 res.json(user);
};

export const changePassword=async(req,res)=>{
 const user=await User.findById(req.user.id);

 user.password=await bcrypt.hash(req.body.password,10);

 await user.save();

 res.json({msg:"Password Updated"});
};



export const refreshToken = async(req,res)=>{
 res.json({msg:"Token refreshed"});
};

export const forgotPassword = async(req,res)=>{
 res.json({msg:"Reset link sent"});
};

export const resetPassword = async(req,res)=>{
 res.json({msg:"Password reset"});
};

export const verifyEmail = async(req,res)=>{
 res.json({msg:"Email verified"});
};

export const resendVerification = async(req,res)=>{
 res.json({msg:"Verification sent"});
};

export const logoutAll = async(req,res)=>{
 await Session.deleteMany({userId:req.user.id});
 res.json({msg:"All sessions removed"});
};
