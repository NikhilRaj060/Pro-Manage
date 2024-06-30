const express = require('express')
const router = express.Router()

const taskController = require('../controllers/taskController')
const verifyToken = require('../middleware/verifyAuth')

router.post("/create-task", verifyToken , taskController.createTask)
// router.get("/get-quiz/:quizId" , taskController.getQuizById)
router.patch('/tasks/:id/type', taskController.updateTaskType);
router.get("/get-all-task-analytics" , verifyToken , taskController.getAllTaskAnalytics)
router.get("/get-task-data-overview" , verifyToken , taskController.getAllTaskDataOverview)
// router.put("/edit-quiz/:quizId" , verifyToken , taskController.editQuiz)
// router.put("/update-quiz/:quizId" , taskController.updateQuiz)
// router.delete("/delete-quiz/:quizId" , verifyToken , taskController.deleteQuiz)

module.exports = router;