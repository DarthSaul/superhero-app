const express = require('express')
const router = express.Router({ mergeParams: true });
const { verifyLogin, isCommentOwner, validateComment } = require('../utilities/middleware');
const comments = require('../controllers/comments')

router.post('/', verifyLogin, validateComment, comments.createComment);

router.delete('/:commentId', verifyLogin, isCommentOwner, comments.destroyComment)

module.exports = router;