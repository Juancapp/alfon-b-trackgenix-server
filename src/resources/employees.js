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
//
router.delete('/delete/:id', (req, res) => {
  const reqId = req.params.id;
  const filtered = employees.filter((emp) => emp.id !== reqId);
  // console.log(filtered);
  fs.writeFile('src/data/employees.json', JSON.stringify(filtered), (err) => {
    if (err) {
      res.send(`Cannot delete user ${err}`);
    } else {
      res.send('User deleted');
    }
  });
});

module.exports = router;
