const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const upload = require("multer")();

// All paths start with '/api/profiles'

// GET /api/profiles
router.get('/', ensureLoggedIn, profilesCtrl.getProfile);
// GET /api/profiles/username
router.get('/username', ensureLoggedIn, profilesCtrl.getName);

// PUT /api/profiles/avatar
router.put('/avatar', upload.single('image'), ensureLoggedIn, profilesCtrl.updateAvatar);


module.exports = router;