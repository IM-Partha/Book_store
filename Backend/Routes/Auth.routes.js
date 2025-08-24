const { Signup, Login } = require('../Controllers/Auth.controller')

const Authroutes = require('express').Router()

Authroutes.post('/signup',Signup) /// Signup
Authroutes.post('/login',Login) // Login
module.exports=Authroutes