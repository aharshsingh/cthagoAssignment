const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { registerController, loginController, fileController, userController } = require('../controllers/index')

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/upload', fileController.upload);
router.get('/userprofile/:userId',auth, userController.userProfile);
router.get('/match/:docId', fileController.match);

module.exports = router;