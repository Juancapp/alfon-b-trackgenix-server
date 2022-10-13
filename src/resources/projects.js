import express from 'express';
import fs from 'fs';

const projects = require('../data/projects.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(projects);
});

router.get('/:id', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projects.find((proj) => proj.id === projectId);
  if (foundProject) {
    res.status(200).json(foundProject);
  } else {
    res.status(404).json({ message: 'Project not foud.' });
  }
});

router.post('/', (req, res) => {
  const newProject = req.body;
  if (!newProject.projectName || !newProject.projectStartDate || newProject.projectName === '' || newProject.projectStartDate === '') {
    res.status(400).json({ message: 'Please include a name and the start date.' });
  }
  const repeatId = projects.find((proj) => proj.id === newProject.id);
  if (repeatId === undefined) {
    projects.push(newProject);
  } else {
    res.status(400).json({ message: 'The id cannot be repeated.' });
  }
  fs.writeFile('src/data/projects.json', JSON.stringify(projects, null, 2), (err) => {
    if (err) {
      res.status(400).json({ message: 'Can not save the new project' });
    } else {
      res.status(200).json({ message: 'Project created' });
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const reqBody = req.body;
  const updated = projects.find((project) => project.id === parseInt(id, 10));
  const deleted = projects.filter((project) => project.id !== parseInt(id, 10));
  const empty = Object.values(reqBody).filter((value) => value === '' || value === null);
  if ((reqBody.role === 'QA' || reqBody.role === 'PM' || reqBody.role === 'DEV' || reqBody.role === 'TL') && empty.length === 0) {
    updated.employee = reqBody;
    res.status(200).json({
      data: updated,
    });
  } else {
    res.status(400).json({ message: 'Id and role(QA, PM, DEV, TL) required' });
  }
  fs.writeFile('src/data/projects.json', JSON.stringify([...deleted, updated]));
  if (!reqBody) {
    res.status(400).json({ message: 'Bad request' });
  }
});

export default router;
