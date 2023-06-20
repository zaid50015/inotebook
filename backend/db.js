const mongoose= require("mongoose");
const mongooseURI="mongodb://127.0.0.1:27017/inotebook";
const connectToMongoose=async()=>{
   try {
    const conn=await mongoose.connect(mongooseURI);
    console.log(`connection sucessfull ${conn.connection.host}`)
   } catch (error) {
    console.log(error)
   }
} 
module.exports=connectToMongoose