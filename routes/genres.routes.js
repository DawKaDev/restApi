const express = require('express');
const router = express.Router();
const GenreController = require('../controllers/genres.controller');

router.get('/genres', GenreController.getAll);
router.get('/genres/:id', GenreController.getOneById);
router.post('/genres', GenreController.add);
router.put('/genres/:id', GenreController.update);
router.delete('/genres/:id', GenreController.delete);

module.exports = router;