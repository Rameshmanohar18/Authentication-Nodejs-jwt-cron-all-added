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
