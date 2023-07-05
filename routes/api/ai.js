const express = require("express");
const router = express.Router();
const aiCtrl = require("../../controllers/api/ai");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/mathpix", ensureLoggedIn, aiCtrl.processImage);

module.exports = router;
