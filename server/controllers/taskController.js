const Task = require('../models/Task');

// Fetch all tasks sorted by newest first
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Fetch a single task by ID
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Create a new task
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title || !title.trim()) {
      res.status(400);
      throw new Error('Title is required and cannot be empty');
    }

    const task = await Task.create({
      title: title.trim(),
      description: description || '',
      status: status || 'Pending',
      priority: priority || 'Medium',
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Update an existing task
const updateTask = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title || !title.trim()) {
      res.status(400);
      throw new Error('Title is required and cannot be empty');
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    task.title = title.trim();
    task.description = description || '';
    task.status = status || task.status;
    task.priority = priority || task.priority;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// Delete a task
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    await task.deleteOne();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
