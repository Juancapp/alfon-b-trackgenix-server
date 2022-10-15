import Employees from '../models/Employees';

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();

    return res.status(200).json({
      message: 'Employees founded',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employees.findById(id);

    return res.status(200).json({
      message: 'Employee Found',
      data: employee,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export const createEmployee = async (req, res) => {
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
      message: 'Employee created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error creating employee',
      data: undefined,
      error: true,
    });
  }
};
