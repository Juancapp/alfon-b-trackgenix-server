const express = require('express');
const fs = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

router.delete('/delete/:id', (req, res) => {
  const reqId = req.params.id;
  const deleted = projects.filter((project) => project.id !== parseInt(reqId, 10));
  fs.writeFile('src/data/projects.json', JSON.stringify(deleted, null, 2), (err) => (err ? res.send('Cannot delete project') : res.send('Project deleted')));
});

router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const reqBody = req.body;
  const updated = projects.find((project) => project.id === parseInt(id, 10));
  const deleted = projects.filter((project) => project.id !== parseInt(id, 10));
  const empty = Object.values(reqBody).filter((value) => value === '' || value === null);

  if (!reqBody) return res.status(400).send('Bad Request');
  if (!updated) {
    res.status(404).send('Project not found');
  } else if (Object.keys(reqBody).length !== 5) {
    res.status(400).send('Must contain 5 fields');
  } else if (empty.length !== 0) {
    res.status(400).send('Property cannot be empty');
  } else {
    deleted.push(reqBody);
    reqBody.id = parseInt(id, 10);
    reqBody.projectManagerId = parseInt(id, 10);
    deleted.sort((a, b) => (a.id - b.id));
    fs.writeFile('src/data/projects.json', JSON.stringify(deleted, null, 2), (err) => (err ? res.status(400).send('Cannot delete project') : res.status(200).send('Project updated')));
  }
  return res.send('Project Updated');
});

router.get('/filter?', (req, res) => {
  const queryParams = req.query;
  let filter = projects;

  if (Object.keys(queryParams).length > 0) {
    const filterProjectName = queryParams.projectName;
    const filterProjectManagerId = parseInt(queryParams.projectManagerId, 10);
    const filterProjectStartDate = queryParams.projectStartDate;
    filter = projects.filter((project) => Object.keys(project) === Object.keys(queryParams));

    if (filterProjectName) {
      filter = projects.filter((project) => project.projectName.includes(filterProjectName));
    }
    if (filterProjectManagerId) {
      // eslint-disable-next-line max-len
      filter = projects.filter((project) => project.projectManagerId === filterProjectManagerId);
      if (filter.length !== 0) {
        res.status(200).send(filter);
      } else {
        res.status(400).json({
          msg: 'Invalid id',
        });
      }
    } else {
      res.status(400).json({
        msg: 'Invalid id',
      });
    }
    if (filterProjectStartDate) {
      // eslint-disable-next-line max-len
      filter = projects.filter((project) => project.projectStartDate.includes(filterProjectStartDate));
    }
    res.status(200).json({
      project: filter,
    });
  } else {
    res.status(404).json({
      msg: 'Project not found',
    });
  }
});

module.exports = router;
