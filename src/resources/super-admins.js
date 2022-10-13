import express from 'express';
import fs from 'fs';

const router = express.Router();
const superAdmins = require('../data/super-admins.json');

router.get('/', (req, res) => {
  res.send(superAdmins);
});

router.get('/:id', (req, res) => {
  const superId = parseInt(req.params.id, 10);
  const foundSupera = superAdmins.find((sup) => sup.id === superId);
  if (foundSupera) {
    res.status(200).send(foundSupera);
  } else {
    res.status(400).json({ message: 'Super Admin not found' });
  }
});

router.post('/', (req, res) => {
  const newSuperAdmins = req.body;
  if (newSuperAdmins.id === '' || newSuperAdmins.name === '' || newSuperAdmins.lastName === '' || newSuperAdmins.email === '' || newSuperAdmins.password === '') {
    res.status(400).json({ message: 'All fiels are required' });
  }
  const repeatId = superAdmins.find((sup) => sup.id === newSuperAdmins.id);
  if (repeatId === undefined) {
    superAdmins.push(newSuperAdmins);
  } else {
    res.status(400).json({ message: 'The id cannot be repeted.' });
  }
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins, null, 2), (err) => {
    if (err) {
      res.status(400).json({ message: 'Cannot save the new Super Admin.' });
    } else {
      res.status(200).json({ message: 'Super Admin created.' });
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const reqBody = req.body;
  const updated = superAdmins.find((sup) => sup.id === parseInt(id, 10));
  const deleted = superAdmins.filter((sup) => sup.id !== parseInt(id, 10));
  const empty = Object.values(reqBody).filter((value) => value === '' || value === null);

  if (!reqBody) {
    res.status(400).json(
      {
        msg: 'Bad request',
      },
    );
  }
  if (!updated) {
    res.status(404).json(
      {
        msg: 'Super Admin not found',
      },
    );
  } else if (Object.keys(reqBody).length < 5) {
    res.status(400).json(
      {
        msg: 'Must contains al least 5 fields',
      },
    );
  } else if (empty.length !== 0) {
    res.status(400).json(
      {
        msg: 'Property cannot be empty',
      },
    );
  } else {
    deleted.push(reqBody);
    reqBody.id = parseInt(id, 10);
    deleted.sort((a, b) => (a.id - b.id));
    fs.writeFile('src/data/super-admins.json', JSON.stringify(deleted, null, 2), (err) => (err ? res.status(400).json(
      {
        msg: 'Cannot update Super Admin',
      },
    )
      : res.status(200).json(
        {
          msg: 'Super Admin updated',
        },
      )));
  }
  res.json(
    {
      msg: 'Super Admin updated',
    },
  );
});

router.delete('/:id', (req, res) => {
  const reqId = req.params.id;
  const deleted = superAdmins.filter((sup) => sup.id !== parseInt(reqId, 10));

  if (deleted.length !== superAdmins.length) {
    fs.writeFile('src/data/super-admins.json', JSON.stringify(deleted, null, 2), (err) => (err ? res.status(404).json(
      {
        msg: 'Cannot delete Super Admin',
      },
    ) : res.json(
      {
        msg: 'Super Admin deleted',
      },
    )
    ));
  } else {
    res.status(404).json(
      {
        msg: 'Invalid id',
      },
    );
  }
});

export default router;
