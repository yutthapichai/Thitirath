const express = require('express');
const router  = express.Router();

const MenuControler = require('../controllers/menu');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

router.post('', checkAuth, extractFile, MenuControler.addMenu);

module.exports = router;
