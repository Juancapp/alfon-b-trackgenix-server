import express from 'express';
import fs from 'fs';

const admins = require('../data/admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(admins);
});

router.get('/:id', (req, res) => {
  const adminID = parseInt(req.params.id, 10);
  const result = admins.find((admin) => admin.id === adminID);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ message: 'Admin whit this ID doesnt exist' });
  }
});

router.post('/', (req, res) => {
  const newAdmin = {
    id: Number(req.body.id),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  };
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.status(400).json({ message: 'Cannot create admin' });
    } else {
      res.status(200).json({ message: 'Admin created' });
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
            res.status(400).json({ message: 'Problem when editing admin' });
          } else {
            res.status(200).json({ message: 'Admin created' });
          }
        });
        res.json({ message: 'Admin updated', admin });
      }
    });
  } else {
    res.json({ message: `No admin with the id ${adminId} found` });
  }
});

router.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  const filteredAdmin = admins.filter((admin) => admin.id !== adminId);
  fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmin), (err) => {
    if (err) {
      res.status(400).json({ message: 'Admin cannot be deleted' });
    } else {
      res.status(200).json({ message: 'Admin deleted' });
    }
  });
});

export default router;
