const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(admins);
});

router.get('/getById/:id', (req, res) => {
  const adminID = parseInt(req.params.id, 10);
  const result = admins.find((admin) => admin.id === adminID);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(400).send(`Admin by ID not found: ${adminID}`);
  }
});

router.get('/getByFN/:first_name', (req, res) => {
  const adminFN = req.params.first_name;
  const result = admins.find((admin) => admin.first_name === adminFN);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(400).send(`Admin by first name not found: ${adminFN}`);
  }
});

router.post('/add', (req, res) => {
  const newAdmin = req.body;
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.status(400).send(`Cannot submit new admin: ${newAdmin}`);
    } else {
      res.status(200).send(`Admin created: ${newAdmin}`);
    }
  });
});

module.exports = router;
