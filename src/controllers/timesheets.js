import mongoose from 'mongoose';
import Timesheets from '../models/Timesheets';

const getAllTimesheets = async (req, res) => {
  try {
    const timesheets = await Timesheets.find().populate('task').populate('employee').populate('project');

    if (!timesheets.length) {
      return res.status(404).json({
        message: 'Timesheets not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Timesheets found successfully',
      data: timesheets,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getTimesheetByID = async (req, res) => {
  const timesheetId = req.params.id;

  if (req.params.id && !mongoose.Types.ObjectId.isValid(timesheetId)) {
    return res.status(400).json({
      message: `Cannot get timesheet by id of ${timesheetId}`,
      data: undefined,
      error: true,
    });
  }
  try {
    const timesheet = await Timesheets.findById(timesheetId).populate('task').populate('employee').populate('project');
    if (timesheet) {
      return res.status(200).json({
        message: `Timesheet with id ${timesheetId} found successfully`,
        data: timesheet,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Timesheet with id ${timesheetId} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const createTimesheet = async (req, res) => {
  try {
    const newTimesheet = new Timesheets({
      description: req.body.description,
      date: req.body.date,
      task: req.body.task,
      hours: req.body.hours,
      employee: req.body.employee,
      project: req.body.project,
    });

    const result = await newTimesheet.save();
    return res.status(201).json({
      message: 'Timesheet created successfully.',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error ${error}`,
      data: undefined,
      error,
    });
  }
};

const updateTimesheets = async (req, res) => {
  const timesheetId = req.params.id;

  if (req.params.id && !mongoose.Types.ObjectId.isValid(timesheetId)) {
    return res.status(400).json({
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

const deleteTimesheets = async (req, res) => {
  const timesheetId = req.params.id;

  if (req.params.id && !mongoose.Types.ObjectId.isValid(timesheetId)) {
    return res.status(400).json({
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

export default {
  getAllTimesheets,
  getTimesheetByID,
  createTimesheet,
  updateTimesheets,
  deleteTimesheets,
};
