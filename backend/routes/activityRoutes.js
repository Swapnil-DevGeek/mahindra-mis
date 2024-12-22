const express = require('express');
const { getAllActivities, getActivityById, createActivity, updateActivity, deleteActivity } = require('../controllers/activityController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/',protect,createActivity);
router.get('/',protect,getAllActivities);
router.get('/:id',protect,getActivityById);
router.put('/:id', protect, updateActivity);
router.delete('/:id', protect, deleteActivity);

module.exports = router;