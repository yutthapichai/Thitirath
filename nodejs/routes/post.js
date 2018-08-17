const express = require('express');
const router = express.Router();

const PostControler = require('../controllers/post');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

router.post('', checkAuth, extractFile, PostControler.storePost);
router.get('', PostControler.fetchposts);
//router.delete('/:id', checkAuth, PostControler.deletepost);
//router.get('/:id', PostControler.editpost);
//router.put('/:id', checkAuth, extractFile, PostControler.updatepost);

module.exports = router;
