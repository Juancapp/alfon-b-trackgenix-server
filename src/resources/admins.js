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
        admin.first_name = updAdmin.first_name ? updAdmin.first_name : admin.first_name; // eslint-disable-line
        admin.last_name = updAdmin.last_name ? updAdmin.last_name : admin.last_name; // eslint-disable-line
        admin.email = updAdmin.email ? updAdmin.email : admin.email; // eslint-disable-line
        admin.password = updAdmin.password ? updAdmin.password : admin.password; // eslint-disable-line
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
