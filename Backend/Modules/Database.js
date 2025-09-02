const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL,{
  } ).then(()=>{
  console.log("MongoDb connect")
}).catch((E)=>{
  console.log("Error",E)
})