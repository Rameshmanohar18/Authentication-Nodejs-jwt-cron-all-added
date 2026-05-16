const redis=require("../config/redis");

exports.get=async(key)=>{
 const data=await redis.get(key);
 return data?JSON.parse(data):null;
};

exports.set=(key,value,ttl=60)=>{
 return redis.set(key,JSON.stringify(value),"EX",ttl);
};