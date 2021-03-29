const express = require('express')
const router = express.Router({ mergeParams: true });
const { verifyLogin, isEquipmentAuthor, validateEquipment } = require('../utilities/middleware');
const comments = require('../controllers/comments')

router.post('/', verifyLogin, comments.createComment);

router.delete('/:commentId', verifyLogin, comments.destroyComment)

module.exports = router;