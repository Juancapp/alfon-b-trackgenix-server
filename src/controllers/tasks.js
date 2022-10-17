import Tasks from '../models/Tasks';

const updateTask = async (req, res) => {
  const reqBody = req.body;
  try {
    const updatedTask = await Tasks.findByIdAndUpdate(reqBody);

    return res.status(200).json({
      message: 'The task has been updated',
      data: updatedTask,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  const reqId = req.params.id;
  try {
    const deletedTask = await Tasks.findByIdAndDelete(reqId);

    return res.status(200).json({
      message: 'The task has been deleted',
      data: deletedTask,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There has been an error',
      error: true,
    });
  }
};

export default {
  updateTask,
  deleteTask,
};
