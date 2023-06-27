const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/posts'

// POST /api/posts/new
router.post('/new', postsCtrl.create);

// GET /api/posts
router.get('/', postsCtrl.index);
// GET /api/posts/:id
router.get('/:id', postsCtrl.getPost);


module.exports = router;