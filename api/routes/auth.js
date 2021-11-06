const { loginUser, regiserUser } = require('../controller/authController');

const router = require('express').Router();



router.post('/login', loginUser)
router.post('/register', regiserUser)



module.exports = router;