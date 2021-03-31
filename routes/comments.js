const express = require('express');
const router = express.Router({ mergeParams: true });
const { verifyLogin, isCommentOwner, validateComment, sanitize } = require('../utilities/middleware');
const comments = require('../controllers/comments');

router.post('/', verifyLogin, sanitize, validateComment, comments.createComment);

router.delete('/:commentId', verifyLogin, isCommentOwner, comments.destroyComment)

module.exports = router;