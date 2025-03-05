const express = require('express');
const router = express.Router();
const { registerController, loginController, fileUploadController } = require('../controllers')

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/upload', fileUploadController.upload);
module.exports = router;