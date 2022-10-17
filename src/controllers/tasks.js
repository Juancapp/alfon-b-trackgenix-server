import Tasks from '../models/Tasks';

const createTask = async (req, res) => {
  try {
    const task = new Tasks({
      description: req.body.description,
    });
    const result = await task.save();
    return res.status(201).json({
      message: 'Task created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Cannot add new task: ${error}`,
      error: true,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();

    return res.status(200).json({
      message: 'Tasks found',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred:  ${error}`,
      error,
    });
  }
};

const getTasksById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    return res.status(200).json({
      message: 'Task found',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Tasks.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: 'The task has been updated',
      data: updatedTask,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Tasks.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'The task has been deleted',
      data: deletedTask,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
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
