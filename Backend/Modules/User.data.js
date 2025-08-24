const mongoose = require('mongoose')

const AuthSchema = mongoose.Schema({
    name:{
        type: String,
        require:true,
       
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    password:{
        type: String,
        require:true,
        
    }
})


const Auth_Data = mongoose.model('Auth',AuthSchema)

module.exports=Auth_Data