import User from "../models/userModel.js";

export const dashboard=async(req,res)=>{
 res.json({
   users:await User.countDocuments()
 });
};

export const promote=async(req,res)=>{
 await User.findByIdAndUpdate(req.body.id,{role:"admin"});
 res.json({msg:"Promoted"});
};

export const demote=async(req,res)=>{
 await User.findByIdAndUpdate(req.body.id,{role:"user"});
 res.json({msg:"Demoted"});
};



export const stats=(req,res)=>res.json({stats:true});
export const sessions=(req,res)=>res.json({sessions:true});
export const logs=(req,res)=>res.json({logs:true});
export const health=(req,res)=>res.json({status:"OK"});
export const userCount=async(req,res)=>{
 res.json({count:await User.countDocuments()});
};
export const revenue=(req,res)=>res.json({revenue:"0"});

export const deleteUser=async(req,res)=>{
 await User.findByIdAndDelete(req.params.id);
 res.json({msg:"Deleted"});
};
