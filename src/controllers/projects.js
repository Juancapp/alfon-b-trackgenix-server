import mongoose from 'mongoose';
import Projects from '../models/Projects';

const updateProject = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      message: `Project with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const updatedProject = await Projects.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (updatedProject) {
      return res.status(200).json({
        message: `Project with id ${req.params.id} updated successfully`,
        data: updatedProject,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Project with id ${req.params.id} not found`,
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

const deleteProject = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      message: `Project with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const deletedProject = await Projects.findByIdAndDelete(id);
    if (deletedProject) {
      return res.status(200).json({
        message: 'Project deleted successfully',
        data: deletedProject,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Project with id ${req.params.id} not found`,
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

export default {
  deleteProject,
  updateProject,
};
