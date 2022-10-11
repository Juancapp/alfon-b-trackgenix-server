const express = require('express');
const fs = require('fs');

const router = express.Router();
const superAdmins = require('../data/super-admins.json');

router.delete('/delete/:id', (req, res) => {
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

router.put('/update/:id', (req, res) => {
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

module.exports = router;
