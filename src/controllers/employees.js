import mongoose from 'mongoose';
import Employees from '../models/Employees';

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();

    return res.status(200).json({
      message: 'Employees founded successfully',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Employees not founded ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  const employeeId = req.params.id;

  if (employeeId && !mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({
      message: `Cannot get employee by ${employeeId}`,
      data: undefined,
      error: true,
    });
  }
  try {
    const employee = await Employees.findById(employeeId);

    if (employee) {
      return res.status(200).json({
        message: 'Employee founded',
        data: employee,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Employee with id ${employeeId} not founded`,
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
    const employeeCreated = new Employees({
      name: req.body.name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      dni: req.body.dni,
    });

    const result = await employeeCreated.save();

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

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
};
