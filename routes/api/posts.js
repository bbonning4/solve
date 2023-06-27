const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/posts'

// POST /api/posts/new
router.post('/new', postsCtrl.create);
// POST create new comment
router.post('/:id/comments/new', postsCtrl.createComment);

// GET /api/posts
router.get('/', postsCtrl.index);
// GET /api/posts/:id
router.get('/:id', postsCtrl.getPost);
// GET api/posts/:id/comments
router.get('/:id/comments', postsCtrl.getPostComments);

// check post's user
router.get('/:id/check', postsCtrl.isUser);

// DELETE /api/posts/:id
router.delete('/:id', postsCtrl.deletePost);

module.exports = router;