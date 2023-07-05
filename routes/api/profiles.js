const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const upload = require("multer")();

// All paths start with '/api/profiles'

// GET /api/profiles
router.get('/', profilesCtrl.getProfile);
// GET /api/profiles/username
router.get('/username', profilesCtrl.getName);

// PUT /api/profiles/avatar
router.put('/avatar', upload.single('image'), profilesCtrl.updateAvatar);


module.exports = router;