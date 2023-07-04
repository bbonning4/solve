const express = require('express');
const router = express.Router();
const commentsCtrl = require('../../controllers/api/comments');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/comments'

// GET /api/comments
router.get('/', commentsCtrl.index);

// PUT /api/comments/:id/mark
router.put('/:id/mark', commentsCtrl.markAnswer);
// PUT /api/comments/:id/unmark
router.put('/:id/unmark', commentsCtrl.unmarkAnswer);

module.exports = router;