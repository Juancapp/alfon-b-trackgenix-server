const express = require('express');
const fs = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

router.get('/getAllProjects', (req, res) => {
  res.send(projects);
});

router.get('/getById/:id', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projects.find((proj) => proj.id === projectId);
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
  const repeatId = projects.find((proj) => proj.id === newProject.id);
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

router.put('/addEmployee/:id', (req, res) => {
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
    res.status(400).json({
      msg: 'Id and role(QA, PM, DEV, TL) required',
    });
  }
  fs.writeFile('src/data/projects.json', JSON.stringify([...deleted, updated]));
  if (!reqBody) {
    res.status(400).json(
      {
        msg: 'Bad request',
      },
    );
  }
});

module.exports = router;
