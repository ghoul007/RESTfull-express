const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')

router.post('/login',userCtrl.login )
router.post('/signup',userCtrl.singup )
router.post('/logout',userCtrl.logout )

module.exports = router;

