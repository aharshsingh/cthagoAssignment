const registerController = require('./auth/registerController');
const loginController = require('./auth/loginController');
const fileController = require('./fileController');
const userController = require('./userController');

module.exports = { registerController, loginController, fileController, userController };