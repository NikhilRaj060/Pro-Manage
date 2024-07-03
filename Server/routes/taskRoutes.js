const express = require('express')
const router = express.Router()

const taskController = require('../controllers/taskController')
const verifyToken = require('../middleware/verifyAuth')

router.post("/create-task", verifyToken , taskController.createTask)
router.get("/get-task/:taskId" , taskController.getTaskById)
router.patch('/tasks/:id/:updateType', taskController.updateTask);
router.get("/get-all-task-analytics" , verifyToken , taskController.getAllTaskAnalytics)
router.get("/get-task-data-overview" , verifyToken , taskController.getAllTaskDataOverview)
router.put("/edit-task/:taskId" , verifyToken , taskController.editTask)
router.delete("/delete-task/:taskId" , verifyToken , taskController.deleteTask)

module.exports = router;