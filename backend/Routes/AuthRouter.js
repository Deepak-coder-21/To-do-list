const {singup, login} = require('../Controllers/AuthController');
const {singupValidation, loginValidation} = require('../Middlewares/AuthValidation');
const routes = require('express').Router();


routes.post('/login', loginValidation,login);
routes.post('/signup', singupValidation,singup);

module.exports = routes;