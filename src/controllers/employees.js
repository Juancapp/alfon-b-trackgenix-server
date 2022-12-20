import mongoose from 'mongoose';
import Employees from '../models/Employees';
import firebase from '../helpers/firebase';

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

const getEmployeeByFireBaseUid = async (req, res) => {
  const employeeFirebaseUid = req.params.firebaseUid;
  try {
    const employee = await Employees.find({ firebaseUid: employeeFirebaseUid });
    if (employee) {
      return res.status(200).json({
        message: 'Employee found successfully',
        data: employee,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Employee with id ${employeeFirebaseUid} not found`,
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
    const findByEmail = await Employees.find({ email: req.body.email });
    if (findByEmail.length > 0) {
      return res.status(400).json({
        message: 'There is already an employee with that email',
        data: undefined,
        error: true,
      });
    }

    const findByDni = await Employees.find({ dni: req.body.dni });
    if (findByDni.length > 0) {
      return res.status(400).json({
        message: 'There is already an employee with that DNI',
        data: undefined,
        error: true,
      });
    }

    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    const newEmployee = new Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      dni: req.body.dni,
      firebaseUid: newFirebaseUser.uid,
    });

    await firebase
      .auth()
      .setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });

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
    return res.status(400).json({
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
      await firebase.auth().updateUser(updatedEmployee.firebaseUid, {
        email: req.body.email,
        password: req.body.password,
      });

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

const updateEmployeeMyProfile = async (req, res) => {
  const employeeId = req.params.id;
  const { token } = req.headers;

  if (req.params.id && !mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({
      message: `Employee id ${employeeId} not valid`,
      data: undefined,
      error: true,
    });
  }

  const decodedToken = await firebase.auth().verifyIdToken(token);
  // eslint-disable-next-line dot-notation
  const decodedTokenId = decodedToken.user_id;
  const decodedTokenRole = decodedToken.role;
  const foundEmployeeById = await Employees.findById(employeeId);
  // eslint-disable-next-line no-underscore-dangle
  if (decodedTokenRole === 'EMPLOYEE' && foundEmployeeById.firebaseUid !== decodedTokenId) {
    return res.status(400).json({
      message: 'You can only edit your own employee',
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
      await firebase.auth().updateUser(updatedEmployee.firebaseUid, {
        email: req.body.email,
        password: req.body.password,
      });

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
    return res.status(400).json({
      message: `Employee id ${employeeId} not valid`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const findEmployeesById = await Employees.findById(req.params.id);

    if (findEmployeesById) {
      firebase.auth().deleteUser(findEmployeesById.firebaseUid);
      const deletedEmployee = await Employees.findByIdAndDelete(id);

      if (deletedEmployee) {
        return res.status(200).json({
          message: 'Employee deleted succesfully',
          data: deletedEmployee,
          error: false,
        });
      }
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
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  getEmployeeByFireBaseUid,
  updateEmployee,
  updateEmployeeMyProfile,
  deleteEmployee,
};
