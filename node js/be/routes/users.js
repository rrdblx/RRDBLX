const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const authMiddleware = require('../middleware/authenticate')

/* GET users listing. */
router.post('/signup', userController.signup) 
router.post('/signin', userController.signin) 
router.post('/issignin', authMiddleware, userController.isSignin)
  

module.exports = router;
