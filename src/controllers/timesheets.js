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
    const deletedTimesheet = await Timesheets.findByIdAndDelete(id);
    if (deletedTimesheet) {
      return res.status(200).json({
        message: `Timesheet with id ${id} successfully deleted`,
        data: deletedTimesheet,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Timesheet wuth id ${id} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Cannot delete Timesheet ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateTimesheets = async (req, res) => {
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
    const updatedTimesheet = await Timesheets.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (updatedTimesheet) {
      return res.status(200).json({
        message: `Timesheet with id ${id} updated successfully`,
        data: updatedTimesheet,
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
      data: undefined,
      error: true,
    });
  }
};

export default {
  updateTimesheets,
  deleteTimesheets,
};
