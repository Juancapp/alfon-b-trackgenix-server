import mongoose from 'mongoose';
import Tasks from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();

    if (!tasks.length) {
      return res.status(404).json({
        message: 'Tasks not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Tasks found successfully',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error:  ${error}`,
      data: undefined,
      error,
    });
  }
};

const getTasksById = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: `Task with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    if (task) {
      return res.status(200).json({
        message: `Task with ${id} found successfully`,
        data: task,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Task with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const newtask = new Tasks({
      description: req.body.description,
    });
    const result = await newtask.save();
    return res.status(201).json({
      message: 'Task created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: `Task with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const updatedTask = await Tasks.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (updatedTask) {
      return res.status(200).json({
        message: `Task with id ${id} updated successfully`,
        data: updatedTask,
      });
    }
    return res.status(404).json({
      message: `Task with id ${id} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: `Task with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const deletedTask = await Tasks.findByIdAndDelete(id);

    if (deletedTask) {
      return res.status(204).json({
        error: false,
      });
    }
    return res.status(404).json({
      message: `Task with id ${id} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
};
