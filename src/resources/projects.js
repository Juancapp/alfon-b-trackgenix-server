const express = require('express');
const fs = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

router.delete('/deleteProject/:id', (req, res) => {
  const reqId = req.params.id;
  const deleted = projects.filter((project) => project.id !== parseInt(reqId, 10));
  fs.writeFile('src/data/projects.json', JSON.stringify(deleted, null, 2), (err) => (err ? res.send('Cannot delete project') : res.send('Project deleted')));
});

router.put('/put/:id', (req, res) => {
  const { id } = req.params;
  const reqBody = req.body;

  if (!reqBody) return res.status(400).send('Bad Request');
  const updated = projects.find((project) => project.id === parseInt(id, 10));
  if (!updated) {
    res.status(404).send('Project not found');
  } else if (Object.keys(reqBody).length !== 5) {
    res.status(400).send('Must contain 5 fields');
  } else {
    const deleted = projects.filter((project) => project.id !== parseInt(id, 10));
    deleted.push(reqBody);
    reqBody.id = parseInt(id, 10);
    reqBody.projectManagerId = parseInt(id, 10);
    deleted.sort((a, b) => (a.id - b.id));
    fs.writeFile('src/data/projects.json', JSON.stringify(deleted, null, 2), (err) => (err ? res.status(400).send('Cannot delete project') : res.status(200).send('Project update')));
  }
  return res.send('Project Updated');
});

module.exports = router;
