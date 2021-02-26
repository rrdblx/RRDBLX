const express = require('express');
const router = express.Router();


const positionController = require('../controllers/position')
const fileuploadMiddleware = require('../middleware/fileupload')
const authMiddleware = require('../middleware/authenticate')


router.post('/save',fileuploadMiddleware.fileupload,positionController.save)
router.get('/find',authMiddleware, positionController.find)
router.get('/:id', positionController.findById)
router.post('/update', positionController.update)
router.delete('/remove',positionController.remove)
router.post('/search', positionController.findByKeywords)

module.exports = router