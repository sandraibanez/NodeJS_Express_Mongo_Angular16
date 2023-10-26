const router = require('express').Router();
const auth = require('../auth.js');
const verifyJWT = require('../../middleware/verifyJWT');

const comments = require('../../controllers/comment.controller.js');

//api/comments
router.param('slug', comments.get_param);
router.get('/:slug', verifyJWT, comments.get_comment);
router.post('/:slug', verifyJWT, comments.create_comment);
router.delete('/:id', verifyJWT, comments.delete_comment);

module.exports = router;