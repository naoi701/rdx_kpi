const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    creatTasks,
    getSingleTasks,
    updateTasks,
    deleteTasks
} = require('../controllers/tasks');


router.get('/', getAllTasks);
router.post('/', creatTasks);
router.get('/:id', getSingleTasks);
router.patch('/:id', updateTasks);
router.delete('/:id', deleteTasks);

module.exports = router;