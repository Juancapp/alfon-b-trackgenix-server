const express = require('express');
const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.delete('/delete/:id', (req, res) => {
  const reqId = req.params.id;
  const filtered = timeSheets.filter((timeSheet) => timeSheet.id !== reqId);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(filtered), (err) => {
    if (err) {
      res.send('Cannot delete timesheet');
    } else {
      res.send('Timesheet deleted');
    }
  });
});

router.put('/put/:id', (req, res) => {
  const reqId = req.params.id;
  const filtered = timeSheets.filter((timeSheet) => timeSheet.id !== reqId);
  filtered.push(req.body);

  fs.writeFile('src/data/time-sheets.json', JSON.stringify(filtered), (err) => {
    if (err) {
      res.send('Cannot edit user');
    } else {
      res.send('User edited');
    }
  });
});

module.exports = router;
