const express = require('express');
const router = express.Router();
const techniciensController = require('../controllers/techniciensController');

router.get('/', techniciensController.getAll);
router.post('/', techniciensController.create);
router.put('/:id', techniciensController.update);
router.delete('/:id', techniciensController.delete);
router.post('/login', techniciensController.login);
router.get('/:id', techniciensController.getById);

module.exports = router;
