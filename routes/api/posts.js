const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const upload = require("multer")();

// All paths start with '/api/posts'

// POST /api/posts/new
router.post('/new', upload.single('image'), ensureLoggedIn, postsCtrl.create);
// POST create new comment
router.post('/:id/comments/new', ensureLoggedIn, postsCtrl.createComment);

// GET /api/posts
router.get('/', ensureLoggedIn, postsCtrl.index);
// GET /api/posts/search
router.get('/search?:q', postsCtrl.search);
// GET /api/posts/:id
router.get('/:id', ensureLoggedIn, postsCtrl.getPost);
// GET api/posts/:id/comments
router.get('/:id/comments', ensureLoggedIn, postsCtrl.getPostComments);


// check post's user
router.get('/:id/check', ensureLoggedIn, postsCtrl.isUser);

// DELETE /api/posts/:id
router.delete('/:id', ensureLoggedIn, postsCtrl.deletePost);

module.exports = router;