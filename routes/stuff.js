const express = require('express');
const router = express.Router();
const Thing = require('../models/thing')
const { fetchStuff, fetchStuffByID, updateStuff, deleteStuff, createStuff } = require('../controllers/stuff')
const multer = require('../middleware/multer-config')
const auth  = require('../middleware/auth')

router.get('',auth, fetchStuff)
router.get('/:id', fetchStuffByID)
router.post('',multer , createStuff)
router.put('/:id',multer,  updateStuff)
router.delete('/:id', deleteStuff)

module.exports = router