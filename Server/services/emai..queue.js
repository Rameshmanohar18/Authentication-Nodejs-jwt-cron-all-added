const {Queue}=require("bullmq");

const emailQueue=new Queue("email");

exports.sendEmail=(data)=>{
 return emailQueue.add("send",data);
};
