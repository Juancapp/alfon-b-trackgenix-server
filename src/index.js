// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const projectRouter = require('./resources/projects');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Project route
app.use('/project', projectRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
