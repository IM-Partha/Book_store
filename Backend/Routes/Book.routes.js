const { GateAllBook } = require('../Controllers/Book.controller')
const { Authmiddleware } = require('../Middleware/Auth.middleware')


const BookRoutes = require('express').Router()

BookRoutes.get('/',Authmiddleware,GateAllBook)

module.exports={BookRoutes}