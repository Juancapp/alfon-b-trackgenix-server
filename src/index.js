// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const projectRouter = require('./resources/projects');
const superRouter = require('./resources/super-admins');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/projects', projectRouter);
app.use('/super-admin', superRouter);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
