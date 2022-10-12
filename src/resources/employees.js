import express from 'express';

import fs from 'fs';

const employees = require('../data/employees.json');

const router = express.Router();

router.put('/:id', (req, res) => {
  const reqId = req.params.id;
  const found = employees.some((emp) => emp.id === parseInt(reqId, 10));
  if (found) {
    const putEmp = req.body;
    putEmp.id = parseInt(reqId, 10);
    const filtered = employees.filter((emp) => emp.id !== parseInt(reqId, 10));
    if ((Object.keys(putEmp)).length === 8) {
      filtered.push(putEmp);
      filtered.sort((a, b) => a.id - b.id);
      fs.writeFile('src/data/employees.json', JSON.stringify(filtered), (err) => {
        if (err) {
          res.status(404).json({ messagge: `Cannot edit user ${err}` });
        } else {
          res.status(200).json({ messagge: 'User edited' });
        }
      });
    } else { res.status(200).json({ messagge: 'Missing data to edit' }); }
  } else { res.status(404).json({ messagge: 'User not found' }); }
});

router.delete('/:id', (req, res) => {
  const reqId = req.params.id;
  const found = employees.some((emp) => emp.id === parseInt(reqId, 10));
  const filtered = employees.filter((emp) => emp.id !== parseInt(reqId, 10));
  if (found) {
    fs.writeFile('src/data/employees.json', JSON.stringify(filtered), (err) => {
      if (err) {
        res.status(404).json({ messagge: `Cannot delete user ${err}` });
      } else {
        res.status(200).json({ messagge: 'User deleted' });
      }
    });
  } else { res.status(404).json({ messagge: 'User not found' }); }
});

export default router;
