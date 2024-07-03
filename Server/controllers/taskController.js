const { v4: uuidv4 } = require("uuid");
const TaskModel = require("../models/task");
const UserModel = require("../models/user");

const createTask = async (req, res, next) => {
  try {
    let userId = req?.currentUserId;
    let createdBy = req?.currentUserId;

    const { title, assigned, priority, tasks, type, dueDate } = req.body;

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

    let assignedEmail = null;
    if (assigned && assigned.email) {
      assignedEmail = assigned.email;
    }

    const newTask = new TaskModel({
      userId,
      taskId,
      taskLink,
      title,
      type,
      priority,
      assigned: assigned ? assigned : {},
      tasks,
      dueDate: dueDate ? dueDate : null,
      createdBy,
      assignedEmail,
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



const editTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    console.log(taskId)
    const { title, assigned, priority, tasks, type, dueDate , createdBy , assignedEmail } = req.body;
    const isValid = validatingEachField({ res, title, type, priority, tasks });
    if (!isValid) return;
    let task = await TaskModel.findOne({ taskId });
    if (!task) {
      return res.status(404).json({
        error: "Validation failed",
        message: "No task found with the given taskId",
      });
    }
    task.userId = task.userId;
    task.title = title;
    task.assigned = assigned;
    task.priority = priority;
    task.tasks = tasks;
    task.type = type;
    task.dueDate = dueDate;
    task.createdBy = createdBy
    task.assignedEmail = assignedEmail
    await task.save();
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllTaskDataOverview = async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { filter } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: "Validation failed",
        message: "User ID is required",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "Validation failed",
        message: "User not found",
      });
    }

    const assignedEmail = user.email; // Assuming email is stored in user document

    let dateFilter = {};
    const currentDate = new Date();

    switch (filter) {
      case "Today":
        dateFilter = {
          $gte: new Date(currentDate.setHours(0, 0, 0, 0)),
          $lt: new Date(currentDate.setHours(23, 59, 59, 999)),
        };
        break;
      case "This Week":
        const startOfWeek = new Date(
          currentDate.setDate(currentDate.getDate() - currentDate.getDay())
        );
        dateFilter = {
          $gte: new Date(startOfWeek.setHours(0, 0, 0, 0)),
          $lt: new Date(
            currentDate.setDate(currentDate.getDate() + 6)
          ).setHours(23, 59, 59, 999),
        };
        break;
      case "This Month":
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        const endOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
        dateFilter = {
          $gte: startOfMonth,
          $lt: new Date(endOfMonth.setHours(23, 59, 59, 999)),
        };
        break;
      default:
        break;
    }

    const query = {
      $or: [
        { userId },
        { assignedEmail }
      ],
      ...(filter && { createdAt: dateFilter }),
    };

    const tasks = await TaskModel.find(query);

    if (!tasks || tasks.length === 0) {
      return res.status(204).json({
        error: "No Task found",
        message: "No tasks matched the given filter",
      });
    }

    return res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
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

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

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

      if (task.dueDate && new Date(task.dueDate) < startOfToday) {
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

const deleteTask = async (req, res, next) => {
  try {
    let userId = req?.currentUserId;
    const { taskId } = req.params;

    if (!taskId) {
      return res
        .status(400)
        .json({ error: "Validation failed", message: "Invalid taskId" });
    }

    let task = await TaskModel.findOneAndDelete({ taskId, userId });

    if ( userId != task?.createdBy ) {
      return res.status(403).json({ error: "Forbidden, Sorry you can not delete this task.", message: "Unauthorized" });
    }

    if (!task) {
      return res.status(404).json({
        error: "Validation failed",
        message: "No task found with given taskId",
      });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const updateType = req.params.updateType
    const { data } = req.body;

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task[updateType] = data;
    await task.save();

    return res
      .status(200)
      .json({ message: "Task type updated successfully", data: task });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res
        .status(400)
        .json({ error: "Validation failed", message: "Invalid taskId" });
    }

    let task = await TaskModel.findOne({ taskId });

    if (!task) {
      return res.status(404).json({
        error: "Validation failed",
        message: "No task found with given taskId",
      });
    }

    await task.save();

    return res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

const validatingEachField = ({ res, title, type, priority, tasks }) => {
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

  return true;
};

module.exports = {
  createTask,
  editTask,
  getAllTaskAnalytics,
  getAllTaskDataOverview,
  updateTask,
  getTaskById,
  deleteTask,
};
