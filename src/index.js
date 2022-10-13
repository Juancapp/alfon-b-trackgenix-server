import express from 'express';
import superAdminRouter from './resources/super-admins';
import projectRouter from './resources/projects';
import timeSheetsRouter from './resources/time-sheets';
import employeesRouter from './resources/employees';
import adminsRouter from './resources/admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/super-admin', superAdminRouter);
app.use('/projects', projectRouter);
app.use('/time-sheets', timeSheetsRouter);
app.use('/employees', employeesRouter);
app.use('/admins', adminsRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
