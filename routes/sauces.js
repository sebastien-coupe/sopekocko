const express = require('express');
const app = require('../app');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');

const sauceController = require('../controllers/sauceController');

router.get('/', auth, sauceController.getAll);
router.get('/:id', auth, sauceController.getOne);
router.post('/', auth, sauceController.create);
router.put('/:id', auth, sauceController.update);
router.delete('/:id', auth, sauceController.delete);

module.exports = router;