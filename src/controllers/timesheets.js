import mongoose from 'mongoose';
import Timesheets from '../models/Timesheets';

const deleteTimesheets = async (req, res) => {
  const timesheetId = req.params.id;

  if (req.params.id && !mongoose.Types.ObjectId.isValid(timesheetId)) {
    return res.status(404).json({
      message: `Timesheet with id ${timesheetId} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const result = await Timesheets.findByIdAndDelete(id);
    if (result) {
      return res.status(200).json({
        message: `Timesheet with id ${id} successfully deleted`,
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Timesheet wuth id ${id} not found`,
      date: result,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Cannot delete Timesheet ${error}`,
      error: true,
    });
  }
};

const editTimesheets = async (req, res) => {
  const timesheetId = req.params.id;

  if (req.params.id && !mongoose.Types.ObjectId.isValid(timesheetId)) {
    return res.status(404).json({
      message: `Cannot edit timesheet by ${timesheetId}`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const result = await Timesheets.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (result) {
      return res.status(200).json({
        message: `Timesheet with id ${id} updated successfully`,
        data: result,
        error: true,
      });
    }
    return res.status(404).json({
      message: `Timesheet with id ${id} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error editing the timesheet ${error}`,
      error: true,
    });
  }
};

export default {
  editTimesheets,
  deleteTimesheets,
};
