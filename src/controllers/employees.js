import mongoose from 'mongoose';
import Employees from '../models/Employees';

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();
    if (employees.length) {
      return res.status(200).json({
        message: 'Employees found successfully',
        data: employees,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Employees not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  const employeeId = req.params.id;
  if (employeeId && !mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({
      message: `Cannot get employee by id ${employeeId}`,
      data: undefined,
      error: true,
    });
  }
  try {
    const employee = await Employees.findById(employeeId);
    if (employee) {
      return res.status(200).json({
        message: 'Employee found successfully',
        data: employee,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Employee with id ${employeeId} not found`,
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

const createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employees({
      name: req.body.name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      dni: req.body.dni,
    });

    const result = await newEmployee.save();
    return res.status(201).json({
      message: 'Employee created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error ${error}`,
      data: undefined,
      error: true,
    });
  }
};
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
    const updatedEmployee = await Employees.findByIdAndUpdate(
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
    const deletedEmployee = await Employees.findByIdAndDelete(id);

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
  getAllEmployees,
  getEmployeeById,
  createEmployee,
};
