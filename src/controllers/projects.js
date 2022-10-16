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
    const id = { id: Number(req.body.id) };
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

const createProject = async (req, res) => {
  try {
    const project = new Projects({
      employees: req.body.employees,
      name: req.body.name,
      startDate: req.body.startDate,
      description: req.body.description,
    });
    return res.status(201).json({
      message: 'Project created successfully',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Cannot add new project',
      error: true,
    });
  }
};

export default {
  getAllProjects,
  getProjectsById,
  createProject,
};
