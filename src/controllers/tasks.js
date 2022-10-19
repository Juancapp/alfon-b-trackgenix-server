import mongoose from 'mongoose';
import Tasks from '../models/Tasks';

const updateTask = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
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
    return res.status(200).json({
      message: `Task with id ${id} updated succesfully`,
      data: updatedTask,
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

const deleteTask = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      message: `Task with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const deletedTask = await Tasks.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Task with id ${id} deleted succesfully`,
      data: deletedTask,
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

export default {
  updateTask,
  deleteTask,
};
