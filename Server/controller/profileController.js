import Profile from "../models/profileModel.js";

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


// Remaining API's wrote here!

export const skills=(req,res)=>{
 res.json({msg:"Skills Updated"});
};

export const location=(req,res)=>{
 res.json({msg:"Location Updated"});
};

export const socials=(req,res)=>{
 res.json({msg:"Social Updated"});
};

export const uploadImage=(req,res)=>{
 res.json({msg:"Image Uploaded"});
};

export const deleteImage=(req,res)=>{
 res.json({msg:"Image Deleted"});
};

export const getByUser=async(req,res)=>{
 res.json(await Profile.findOne({
  userId:req.params.userId
 }));
};
