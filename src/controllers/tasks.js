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
      message: `Cannot create Task: ${error}`,
      error: true,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();

    return res.status(200).json({
      message: 'Tasks found successfully',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Cannot get all Tasks:  ${error}`,
      error,
    });
  }
};

const getTasksById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    return res.status(200).json({
      message: `Task with ${id} found successfully`,
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Cannot get Task: ${error}`,
      error: true,
    });
  }
};

export default {
  getAllTasks,
  getTasksById,
  createTask,
};
