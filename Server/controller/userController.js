import User from "../models/userModel.js";

export const getUsers=async(req,res)=>{
 res.json(await User.find());
};

export const getUser=async(req,res)=>{
 res.json(await User.findById(req.params.id));
};

export const updateUser=async(req,res)=>{
 res.json(await User.findByIdAndUpdate(
  req.params.id,
  req.body,
  {new:true}
 ));
};

export const deleteUser=async(req,res)=>{
 await User.findByIdAndDelete(req.params.id);
 res.json({msg:"Deleted"});
};

export const block=async(req,res)=>{
 await User.findByIdAndUpdate(req.params.id,{blocked:true});
 res.json({msg:"Blocked"});
};

export const unblock=async(req,res)=>{
 await User.findByIdAndUpdate(req.params.id,{blocked:false});
 res.json({msg:"Unblocked"});
};
