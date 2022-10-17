import employees from '../models/Employees';

const deleteEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employees.findByIdAndDelete(id);
    return res.status(204).json({
      message: `Employee with id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      error: true,
    });
  }
};

export default {
  deleteEmployees,
};
