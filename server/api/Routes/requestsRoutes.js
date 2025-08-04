const express = require("express");
const router = express.Router();

const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authCheckmiddleware');

router.post('/',authMiddleware, requestController.createRequest);

module.exports = router;