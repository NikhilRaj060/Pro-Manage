const { v4: uuidv4 } = require("uuid");
const TaskModel = require("../models/task");
const moment = require("moment");

const createTask = async (req, res, next) => {
  try {
    let userId = req?.currentUserId;

    const { title, assigned, priority, tasks, type, dueDate } = req.body;

    console.log(req.body);

    const isValid = validatingEachField({
      res,
      title,
      type,
      priority,
      tasks,
    });

    if (!isValid) return;

    const taskId = uuidv4();
    let taskLink = `${process.env.FRONTEND_URL}/task/${taskId}`;

    const newTask = new TaskModel({
      userId,
      taskId,
      taskLink,
      title,
      type,
      priority,
      assigned: assigned ? assigned : {},
      tasks,
      dueDate: dueDate ? dueDate : "",
    });

    let resp = await newTask.save();

    if (resp) {
      return res
        .status(201)
        .json({ message: "Task created successfully", taskLink });
    }
  } catch (error) {
    next(error);
  }
};

// const getQuizById = async (req, res, next) => {
//   try {
//     const { quizId } = req.params;

//     if (!quizId) {
//       return res
//         .status(400)
//         .json({ error: "Validation failed", message: "Invalid quizId" });
//     }

//     let quiz = await QuizModel.findOne({ quizId });

//     if (!quiz) {
//       return res.status(404).json({
//         error: "Validation failed",
//         message: "No quiz found with given quizId",
//       });
//     }

//     quiz.impression += 1;
//     await quiz.save();

//     return res.status(200).json({ quiz });
//   } catch (error) {
//     next(error);
//   }
// };

// const editQuiz = async (req, res, next) => {
//   try {
//     let userId = req?.currentUserId;
//     const { quizId } = req.params;
//     const { quiz_name, quiz_type, option_type, timer, questions, impression } =
//       req.body;

//     const isValid = validatingEachField({
//       res,
//       quiz_name,
//       quiz_type,
//       option_type,
//       timer,
//       questions,
//     });

//     if (!isValid) return;

//     // Fetching the quiz details from the database
//     let quiz = await QuizModel.findOne({ quizId, userId });

//     // Check if the quiz exists fro the particular quizId
//     if (!quiz) {
//       return res.status(404).json({
//         error: "Validation failed",
//         message: "No quiz found with the given quizId",
//       });
//     }

//     // Updating the quiz details with the new data
//     quiz.userId = userId;
//     quiz.impression = impression;
//     quiz.quiz_name = quiz_name;
//     quiz.quiz_type = quiz_type;
//     quiz.option_type = option_type;
//     quiz.timer = timer;
//     quiz.questions = questions;

//     // Saving the updated quiz details back to the database for the updation
//     await quiz.save();

//     // Return success response
//     return res.status(200).json({ message: "Quiz updated successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateQuiz = async (req, res, next) => {
//   try {
//     const { quizId } = req.params;
//     const { quiz_name, quiz_type, option_type, timer, questions, impression } =
//       req.body;

//     // Validate each field
//     const isValid = validatingEachField({
//       res,
//       quiz_name,
//       quiz_type,
//       option_type,
//       timer,
//       questions,
//     });

//     if (!isValid) return;

//     // Fetching the quiz details from the database using quizId
//     let quiz = await QuizModel.findOne({ quizId });

//     // Check if the quiz exists for the particular quizId
//     if (!quiz) {
//       return res.status(404).json({
//         error: "Validation failed",
//         message: "No quiz found with the given quizId",
//       });
//     }

//     // Updating the quiz details with the new data
//     if (quiz_name) quiz.quiz_name = quiz_name;
//     if (quiz_type) quiz.quiz_type = quiz_type;
//     if (option_type) quiz.option_type = option_type;
//     if (timer) quiz.timer = timer;
//     if (questions) quiz.questions = questions;
//     if (impression) quiz.impression = impression;

//     // Saving the updated quiz details back to the database
//     await quiz.save();

//     // Return success response
//     return res.status(200).json({ message: "Quiz updated successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

const getAllTaskDataOverview = async (req, res, next) => {
  try {
    let userId = req?.currentUserId;

    let resp = await TaskModel.find({ userId });

    if (!resp) {
      return res.status(404).json({
        error: "Validation failed",
        message: "No Task found",
      });
    }

    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", data: resp });
  } catch (error) {
    next(error);
  }
};
const getAllTaskAnalytics = async (req, res, next) => {
  try {
    let userId = req?.currentUserId;

    // Fetch all tasks for the user
    let tasks = await TaskModel.find({ userId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        error: "Validation failed",
        message: "No tasks found",
      });
    }

    // Initialize counts
    let taskCounts = {
      BACKLOG: 0,
      TODO: 0,
      INP: 0,
      COMPLETED: 0,
    };

    let priorityCounts = {
      LP: 0,
      MP: 0,
      HP: 0,
      DD: 0,
    };

    tasks.forEach((task) => {
      switch (task.type) {
        case "BACKLOG":
          taskCounts.BACKLOG++;
          break;
        case "TODO":
          taskCounts.TODO++;
          break;
        case "INP":
          taskCounts.INP++;
          break;
        case "COMPLETED":
          taskCounts.COMPLETED++;
          break;
        default:
          break;
      }

      switch (task.priority.code) {
        case "LP":
          priorityCounts.LP++;
          break;
        case "MP":
          priorityCounts.MP++;
          break;
        case "HP":
          priorityCounts.HP++;
          break;
        default:
          break;
      }

      if (task.date && new Date(task.date) < new Date()) {
        priorityCounts.DD++;
      }
    });

    return res.status(200).json({
      message: "Task analytics fetched successfully",
      data: {
        taskCounts,
        priorityCounts,
      },
    });
  } catch (error) {
    next(error);
  }
};

// const deleteTask = async (req, res, next) => {
//   try {
//     let userId = req?.currentUserId;
//     const { quizId } = req.params;

//     if (!quizId) {
//       return res
//         .status(400)
//         .json({ error: "Validation failed", message: "Invalid quizId" });
//     }

//     let quiz = await QuizModel.findOneAndDelete({ quizId, userId });

//     if (!quiz) {
//       return res.status(404).json({
//         error: "Validation failed",
//         message: "No quiz found with given quizId",
//       });
//     }

//     return res.status(200).json({ message: "Quiz deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

const updateTaskType = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { type } = req.body;

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.type = type;
    await task.save();

    return res.status(200).json({ message: "Task type updated successfully", data: task });
  } catch (error) {
    next(error);
  }
};

const validatingEachField = ({ res, title, type, priority, tasks }) => {
  // Validating each required field individually
  if (!title) {
    res.status(400).json({
      error: "Validation failed",
      message: "Title is required",
      field: "title",
    });
    return false;
  }

  // Validating each required field individually
  if (!type) {
    res.status(400).json({
      error: "Validation failed",
      message: "Type is required",
      field: "Type",
    });
    return false;
  }

  // Validating Priority
  if (!priority || !priority.code || !priority.title || !priority.color) {
    res.status(400).json({
      error: "Validation failed",
      message: "Invalid priority",
      field: "priority",
    });
    return false;
  }

  // Validating Tasks array
  if (!Array.isArray(tasks) || tasks.length === 0) {
    res.status(400).json({
      error: "Validation failed",
      message: "At least one task is required",
      field: "tasks",
    });
    return false;
  }

  // Validating each task
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    // Check if title is missing or empty
    if (
      !task.title ||
      typeof task.title !== "string" ||
      task.title.trim() === ""
    ) {
      res.status(400).json({
        error: "Validation failed",
        message: `Invalid title for task ${i + 1}`,
        field: `tasks[${i}].title`,
      });
      return false;
    }

    // Validate completed flag
    if (typeof task.completed !== "boolean") {
      res.status(400).json({
        error: "Validation failed",
        message: `Invalid completed flag for task ${i + 1}`,
        field: `tasks[${i}].completed`,
      });
      return false;
    }
  }

  // All validations passed
  return true;
};

module.exports = {
  createTask,
  // getQuizById,
  // editQuiz,
  getAllTaskAnalytics,
  getAllTaskDataOverview,
  updateTaskType,
  // deleteTask,
  // updateQuiz,
};
