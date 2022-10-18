import mongoose from 'mongoose';
import superAdmins from '../models/Super-admins';

const updateSuperAdmin = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      message: `Super Admin with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const updatedSuperAdmin = await superAdmins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (updatedSuperAdmin) {
      return res.status(200).json({
        message: `Super Admin with id ${req.params.id} updated successfully`,
        data: updatedSuperAdmin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Super Admin with id ${req.params.id} not found`,
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

const deleteSuperAdmin = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      message: `SuperAdmin with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const deletedSuperAdmin = await superAdmins.findByIdAndDelete(id);
    if (deletedSuperAdmin) {
      return res.status(200).json({
        message: 'SuperAdmin deleted successfully',
        data: deletedSuperAdmin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `SuperAdmin with id ${req.params.id} not found`,
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
  deleteSuperAdmin,
  updateSuperAdmin,
};
