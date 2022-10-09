/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(admins);
});

router.get('/getById/:id', (req, res) => {
  const adminID = req.params.id;
  const result = admins.find((admin) => admin.id == adminID);
  if (result) {
    res.send(result);
  } else {
    res.send('Admin by ID not found');
  }
});

router.get('/getByFN/:first_name', (req, res) => {
  const adminFN = req.params.first_name;
  const result = admins.find((admin) => admin.first_name == adminFN);
  if (result) {
    res.send(result);
  } else {
    res.send('Admin by name not found');
  }
});

router.get('/getByLN/:last_name', (req, res) => {
  const adminLN = req.params.last_name;
  const result = admins.find((admin) => admin.last_name == adminLN);
  if (result) {
    res.send(result);
  } else {
    res.send('Admin by surname not found');
  }
});

router.get('/getByEmail/:email', (req, res) => {
  const adminEmail = req.params.email;
  const result = admins.find((admin) => admin.email == adminEmail);
  if (result) {
    res.send(result);
  } else {
    res.send('Admin by email not found');
  }
});

router.post('/add', (req, res) => {
  const newAdmin = req.body;
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.send('Cannot submit new admin');
    } else {
      res.send('Admin(s) created');
    }
  });
});

module.exports = router;
