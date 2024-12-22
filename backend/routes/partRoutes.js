const express = require('express');
const {protect} = require('../middlewares/authMiddleware');
const { createPart, getPartsByProject, getPartById, updatePart, deletePart } = require('../controllers/partController');

const router = express.Router();

router.post('/',protect,createPart);
router.get('/project/:project_id',protect,getPartsByProject);
router.get('/:part_id',protect,getPartById);
router.put('/:part_id',protect,updatePart);
router.delete('/:part_id',protect,deletePart);

module.exports = router;