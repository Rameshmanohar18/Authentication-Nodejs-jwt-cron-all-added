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


// Remaining API's


export const search=async(req,res)=>{
 res.json(await User.find({
   name:new RegExp(req.params.q,"i")
 }));
};

export const activeUsers=async(req,res)=>{
 res.json(await User.find({blocked:false}));
};

export const inactiveUsers=async(req,res)=>{
 res.json(await User.find({blocked:true}));
};

export const stats=async(req,res)=>{
 res.json({
  total:await User.countDocuments()
 });
};

export const recent=async(req,res)=>{
 res.json(await User.find().sort({_id:-1}).limit(5));
};

export const changeRole=async(req,res)=>{
 await User.findByIdAndUpdate(
   req.body.id,
   {role:req.body.role}
 );
 res.json({msg:"Role Updated"});
};

export const uploadAvatar=(req,res)=>{
 res.json({msg:"Avatar Uploaded"});
};

export const removeAvatar=(req,res)=>{
 res.json({msg:"Avatar Removed"});
};
