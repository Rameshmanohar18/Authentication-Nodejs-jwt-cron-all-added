const cache=require("../../services/cache.service");

exports.getUsers=async(req,res)=>{
 const cached=await cache.get("users");

 if(cached) return res.json(cached);

 const users=await User.find();

 await cache.set("users",users,120);

 res.json(users);
};