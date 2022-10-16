import Projects from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const project = await Projects.find();
    return res.status(200).json({
      message: 'Project found',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'There was an error',
      error: true,
    });
  }
};

const getProjectsById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.findById(id);
    return res.status(200).json({
      message: 'Project found',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'There was an error',
      error: true,
    });
  }
};

export default {
  getAllProjects,
  getProjectsById,
};
