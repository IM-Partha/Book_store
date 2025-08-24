const express = require('express');
const AuthRoutes = express.Router();
const { Register, Login } = require('../Controllers/Auth.controller');


// Signup route
AuthRoutes.post('/register', Register);

// Login route
AuthRoutes.post('/login', Login);

module.exports = AuthRoutes;
