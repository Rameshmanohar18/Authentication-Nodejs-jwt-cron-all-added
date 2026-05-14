import Session from "../models/sessionModel.js";

export const getSessions=async(req,res)=>{
 res.json(await Session.find({userId:req.user.id}));
};

export const deleteSession=async(req,res)=>{
 await Session.findByIdAndDelete(req.params.id);
 res.json({msg:"Session Removed"});
};


// Remaining API's


export const deleteAll=async(req,res)=>{
 await Session.deleteMany({userId:req.user.id});
 res.json({msg:"All Removed"});
};

export const active=(req,res)=>res.json({active:true});
export const history=(req,res)=>res.json({history:true});
export const device=(req,res)=>res.json({device:true});
export const extend=(req,res)=>res.json({extended:true});
export const count=(req,res)=>res.json({count:1});
export const invalidate=(req,res)=>res.json({invalidated:true});
export const create=(req,res)=>res.json({created:true});
