// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const employeesRouter = require('./resources/employees');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/employees', employeesRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
