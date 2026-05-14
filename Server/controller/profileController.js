import Profile from "../models/profileMode.js";

export const create=async(req,res)=>{
 res.json(await Profile.create({
   userId:req.user.id,
   ...req.body
 }));
};

export const get=async(req,res)=>{
 res.json(await Profile.findOne({userId:req.user.id}));
};

export const update=async(req,res)=>{
 res.json(await Profile.findOneAndUpdate(
  {userId:req.user.id},
  req.body,
  {new:true}
 ));
};

const deleteProfile=async(req,res)=>{
 await Profile.deleteOne({userId:req.user.id});
 res.json({msg:"Deleted"});
};

export { deleteProfile as delete };
