import mongoose from 'mongoose';
import Timesheets from '../models/Timesheets';

const getAllTimesheets = async (req, res) => {
  try {
    const timesheets = await Timesheets.find();

    if (!timesheets) {
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
    return res.status(404).json({
      message: `Cannot get timesheet by ${timesheetId}`,
      data: undefined,
      error: true,
    });
  }
  try {
    const timesheet = await Timesheets.findById(timesheetId);
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

export default {
  getAllTimesheets,
  getTimesheetByID,
  createTimesheet,
};
