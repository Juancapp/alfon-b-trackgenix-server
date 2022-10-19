import mongoose from 'mongoose';
import employees from '../models/Employees';

const updateEmployee = async (req, res) => {
  const employeeId = req.params.id;

  if (req.params.id && !mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(404).json({
      message: `Employee id ${employeeId} not valid`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const updatedEmployee = await employees.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (updatedEmployee) {
      return res.status(200).json({
        message: `Employee with id ${id} updated successfully`,
        data: updatedEmployee,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Employee with id ${id} not found`,
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

const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;

  if (req.params.id && !mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(404).json({
      message: `Employee id ${employeeId} not valid`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const deletedEmployee = await employees.findByIdAndDelete(id);

    if (deletedEmployee) {
      return res.status(200).json({
        message: 'Employee deleted succesfully',
        data: deletedEmployee,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Employee with id ${id} not found`,
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
  updateEmployee,
  deleteEmployee,
};
