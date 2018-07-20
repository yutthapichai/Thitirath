const express = require('express');
const router  = express.Router();

const MenuControler = require('../controllers/menu');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

router.post('', checkAuth, extractFile, MenuControler.addMenu);
router.get('', MenuControler.fetchMenu);
router.delete('/:id', checkAuth,MenuControler.deleteMenu);
router.get('/:id', MenuControler.editMenu);
router.put('/:id', checkAuth, extractFile, MenuControler.updateMenu);

module.exports = router;
