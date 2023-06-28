const express = require('express');
const router = express.Router();
const commentsCtrl = require('../../controllers/api/comments');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/comments'

// GET /api/comments
router.get('/', commentsCtrl.index);

module.exports = router;