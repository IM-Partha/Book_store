const express = require('express')
require('dotenv').config()
const index= express()
require('./Modules/Database')
const { BookRoutes } = require('./Routes/Book.routes')
const  Authroutes  = require('./Routes/Auth.routes')

const cors = require('cors')
index.use(express.json());


index.use(cors());
index.use('/Api',BookRoutes)// For Get Book Api
index.use('/Api',Authroutes) // for Login And Registration 

/// for index Check
index.use('/ping',(req,res)=>{
    res.status(200).json({  
        message:"PONG"
    })
})


const PORT = process.env.PORT || 3000;
index.listen(PORT,()=>{
    console.log(`index is running on port ${PORT}`)
})