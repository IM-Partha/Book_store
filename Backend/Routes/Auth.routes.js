const express = require('express');
const { Register, Login } = require('../Controllers/Auth.controller');

const AuthRoutes = express.Router();

// Signup route
AuthRoutes.post('/register', Register);

// Login route
AuthRoutes.post('/login', Login);

module.exports = AuthRoutes;
