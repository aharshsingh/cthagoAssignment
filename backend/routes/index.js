const express = require('express');
const router = express.Router();
const { registerController, loginController, fileController, userController } = require('../controllers')

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/upload', fileController.upload);
router.get('/userprofile/:userId', userController.userProfile);
router.get('/matches/:docId', fileController.match);

module.exports = router;