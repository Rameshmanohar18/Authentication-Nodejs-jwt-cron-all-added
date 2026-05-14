import Session from "../models/sessionModel.js";

export const getSessions=async(req,res)=>{
 res.json(await Session.find({userId:req.user.id}));
};

export const deleteSession=async(req,res)=>{
 await Session.findByIdAndDelete(req.params.id);
 res.json({msg:"Session Removed"});
};
