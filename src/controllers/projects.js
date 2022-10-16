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
      message: `Cannot find all projects ${error}`,
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
      message: `Cannot find project by id ${error}`,
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
      clientName: req.body.clientName,
      active: req.body.active,
    });
    const result = await project.save();
    return res.status(201).json({
      message: 'Project created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `Cannot add new project ${error}`,
      error: true,
    });
  }
};

export default {
  getAllProjects,
  getProjectsById,
  createProject,
};
