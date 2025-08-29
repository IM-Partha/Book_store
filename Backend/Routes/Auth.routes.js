const express = require('express');
const AuthRoutes = express.Router();
const { Register, Login } = require('../Controllers/Auth.controller');



AuthRoutes.post('/register', Register);
AuthRoutes.post('/login', Login);

module.exports = AuthRoutes;
