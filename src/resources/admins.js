const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.delete('/delete/:id', (req, res) => {
  const adminId = req.params.id;
  const filteredAdmin = admins.filter((admin) => admin.id !== adminId);
  fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmin), (err) => {
    if (err) {
      res.send('Admin cannot be deleted');
    } else {
      res.send(`Admin with id ${adminId} deleted`);
    }
  });
});

router.put('/:id', (req, res) => {
  const adminId = req.params.id;
  const filteredAdmin = admins.find((admin) => admin.id !== adminId);
  if (filteredAdmin) {
    const updAdmin = req.body;
    admins.forEach((admin) => {
      if (admin.id === parseInt(req.params.id, 10)) {
        if (updAdmin.first_name) {
          filteredAdmin.first_name = updAdmin.first_name;
        }
        if (updAdmin.last_name) {
          filteredAdmin.last_name = updAdmin.last_name;
        }
        if (updAdmin.email) {
          filteredAdmin.email = updAdmin.email;
        }
        if (updAdmin.password) {
          filteredAdmin.password = updAdmin.password;
        }
        fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
          if (err) {
            res.send('Problem when editing admin');
          } else {
            res.send('Admin created');
          }
        });
        res.json({ msg: 'Admin updated', admin });
      }
    });
  } else {
    res.send(`No admin with the id ${adminId} found`);
  }
});

module.exports = router;
