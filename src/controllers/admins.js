import mongoose from 'mongoose';
import Admins from '../models/Admins';

const deleteAdmins = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      message: 'id invalid',
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const admins = await Admins.findByIdAndDelete(id);

    if (admins) {
      return res.status(200).json({
        message: 'Deleted successfully',
        data: admins,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with id ${id} not found`,
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'An error ocurred',
      data: undefined,
      error: err,
    });
  }
};

const updateAdmins = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({
      message: 'id invalid',
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const admins = await Admins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (admins) {
      return res.status(200).json({
        message: `Admin with id ${id} updated successfully`,
        data: admins,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with id ${id} not found`,
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'An error ocurred',
      data: undefined,
      error: err,
    });
  }
};

export default { deleteAdmins, updateAdmins };
