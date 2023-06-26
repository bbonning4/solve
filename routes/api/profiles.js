const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/profiles'

// GET /api/profiles
router.get('/', profilesCtrl.getProfile);


module.exports = router;