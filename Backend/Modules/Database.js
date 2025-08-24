// Modules/Database.js
require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("MongoDb connect")
}).catch((E)=>{
  console.log("Error",E)
})