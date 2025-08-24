const mongoose = require('mongoose')

const AuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,   // ✅ Corrected
    },
    email: {
        type: String,
        required: true,   // ✅ Corrected
        unique: true
    },
    password: {
        type: String,
        required: true,   // ✅ Corrected
    }
})

const Auth_Data = mongoose.model('Auth', AuthSchema)

module.exports = Auth_Data
