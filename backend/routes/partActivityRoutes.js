const express= require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createPartActivity, getPartActivities, updatePartActivity } = require('../controllers/partActivityController');

const router = express.Router();

router.post('/',protect,createPartActivity);
router.get('/:part_id',protect,getPartActivities);
router.put('/:id',protect,updatePartActivity);

module.exports = router;