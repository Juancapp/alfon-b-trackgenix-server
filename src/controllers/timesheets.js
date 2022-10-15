import Timesheets from '../models/Timesheets';

const deleteTimesheets = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Timesheets.findByIdAndDelete(id);
    return res.status(200).json({
      message: `Timesheet with id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      error,
    });
  }
};

const editTimesheets = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Timesheets.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: `Timesheet with id ${id} edited`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};

export default {
  editTimesheets,
  deleteTimesheets,
};
