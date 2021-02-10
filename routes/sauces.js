const express = require('express');
const app = require('../app');
const router = express.Router();

const sauceController = require('../controllers/sauceController');

router.get('/', sauceController.getAll);
router.get('/:id', sauceController.getOne);
router.post('/', sauceController.create);
router.put('/:id', sauceController.update);
router.delete('/:id', sauceController.delete);

module.exports = router;