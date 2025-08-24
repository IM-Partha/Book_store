const mongoose = require('mongoose')

const BookDataSchema = mongoose.Schema({
    name:{
        type:String,
    },
    price:{
        type:String,
    },
    image:{
        type:String,
    }
})

const BookAllData = mongoose.model('BooksData',BookDataSchema)

module.exports = BookAllData