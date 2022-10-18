import employees from '../models/Employees';

const editEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employees.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (result) {
      return res.status(200).json({
        message: `Employee with id ${id} updated successfully`,
        data: result,
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
      error,
    });
  }
};

const deleteEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employees.findByIdAndDelete(id);

    if (result) {
      return res.status(200).json({
        message: 'Employee deleted succesfully',
        data: result,
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
  editEmployees,
  deleteEmployees,
};
