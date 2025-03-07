const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { registerController, loginController, fileController, userController, adminController } = require('../controllers/index')

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/upload',auth, fileController.upload);
router.get('/userprofile/:userId',auth, userController.userProfile);
router.get('/match/:docId',auth, fileController.match);
router.patch('/creditRequest/:userId', userController.creditRequest);
router.get('/getcreditrequest', adminController.getCreditRequest);
router.post('/approve/:userId', adminController.approveCreditRequest);
router.post('/analytics', adminController.getUserScans);

module.exports = router;