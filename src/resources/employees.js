// put delete
// import express from 'express';

const express = require('express');

const fs = require('fs');
// import fs from 'fs';

// use "require" to import JSON files
const employees = require('../data/employees.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(employees);
});

router.put('/put/:id', (req, res) => {
  const reqId = req.params.id;
  const found = employees.some((emp) => emp.id === parseInt(reqId, 10));
  if (found) {
    const putEmp = req.body;
    const filtered = employees.filter((emp) => emp.id !== parseInt(reqId, 10));
    if ((Object.keys(putEmp)).length === 8) {
      filtered.push(putEmp);
      fs.writeFile('src/data/employees.json', JSON.stringify(filtered), (err) => {
        if (err) {
          res.send(`Cannot edit user ${err}`);
        } else {
          res.send('User edited');
        }
      });
    } else { res.send('Missing data to edit'); }
  } else { res.send('User not found'); }
});

router.delete('/delete/:id', (req, res) => {
  const reqId = req.params.id;
  const found = employees.some((emp) => emp.id === parseInt(reqId, 10));
  const filtered = employees.filter((emp) => emp.id !== parseInt(reqId, 10));
  if (found) {
    fs.writeFile('src/data/employees.json', JSON.stringify(filtered), (err) => {
      if (err) {
        res.send(`Cannot delete user ${err}`);
      } else {
        res.send(`User deleted ${filtered}`);
      }
    });
  } else { res.send('User not found'); }
});

module.exports = router;
