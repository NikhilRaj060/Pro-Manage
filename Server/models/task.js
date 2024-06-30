const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const AssignedSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  initials: {
    type: String,
  },
});

const PrioritySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const TasksSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  taskId: {
    type: String,
    unique: true,
    required: true,
  },
  taskLink: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: PrioritySchema,
    required: true,
  },
  assigned: {
    type: AssignedSchema,
    required: true,
  },
  tasks: [TaskSchema],
  type : {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    default: null,
  },
},{timestamps: {createdAt: 'createdAt' , updatedAt: "updatedAt" }})

module.exports = mongoose.model("Tasks", TasksSchema);
