const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const imageUpload = require('../middlewares/imageUploadMiddleware');

const sauceController = require('../controllers/sauceController');

router.get('/', auth, sauceController.getAll);
router.get('/:id', auth, sauceController.getOne);
router.post('/', auth, imageUpload, sauceController.create);
router.put('/:id', auth, imageUpload, sauceController.update);
router.delete('/:id', auth, sauceController.delete);
router.post('/:id/like', auth, sauceController.addLike);

module.exports = router;