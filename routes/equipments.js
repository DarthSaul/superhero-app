const express = require('express')
const router = express.Router({ mergeParams: true });
const { verifyLogin, isEquipmentAuthor, validateEquipment } = require('../utilities/middleware');
const equipment = require('../controllers/equipment')

router.post('/', verifyLogin, validateEquipment, equipment.createEquipment);

router.delete('/:equipId', verifyLogin, isEquipmentAuthor, equipment.destroyEquipment);

module.exports = router;