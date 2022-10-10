/* eslint-disable no-shadow */
/* eslint-disable import/order */
const express = require('express');
const projects = require('../data/projects.json');
const fs = require('fs');

const router = express.Router();

router.get('/getAllProjects', (req, res) => {
  res.send(projects);
});

router.get('/getById/:id', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projects.find((projects) => projects.id === projectId);
  if (foundProject) {
    res.status(200).send(foundProject);
  } else {
    res.status(400).json({ msg: 'Project not foud.' });
  }
});

router.post('/add', (req, res) => {
  const newProject = req.body;
  if (!newProject.projectName || !newProject.projectStartDate || newProject.projectName === '' || newProject.projectStartDate === '') {
    res.status(400).json({ msg: 'Please include a name and the start date.' });
  }
  const repeatId = projects.find((projects) => projects.id === newProject.id);
  if (repeatId === undefined) {
    projects.push(newProject);
  } else {
    res.status(400).json({ msg: 'The id cannot be repeated.' });
  }
  fs.writeFile('src/data/projects.json', JSON.stringify(projects, null, 2), (err) => {
    if (err) {
      res.status(400).json({ msg: 'Can not save the new project' });
    } else {
      res.status(200).json({ msg: 'Project created' });
    }
  });
});

module.exports = router;
