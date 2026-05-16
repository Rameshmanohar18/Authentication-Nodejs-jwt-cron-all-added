const {Worker}=require("bullmq");

new Worker("email",async(job)=>{
 console.log("Sending Email",job.data);
});