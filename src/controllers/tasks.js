import Tasks from '../models/Tasks';

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
  updateTask,
  deleteTask,
};
