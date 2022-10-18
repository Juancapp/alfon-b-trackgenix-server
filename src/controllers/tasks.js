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
      message: `Task with id ${id} updated succesfully`,
      data: updatedTask,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Error editing the Task ${error} `,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Tasks.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Task with ${id} deleted`,
      data: deletedTask,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Cannot delete Task: ${error}`,
      error: true,
    });
  }
};

export default {
  updateTask,
  deleteTask,
};
