import express from 'express';
import taskRouter from './controllers/tasks';
import superAdminRouter from './controllers/super-admins';
import projectRouter from './controllers/projects';
import timeSheetsRouter from './controllers/time-sheets';
import employeesRouter from './controllers/employees';
import adminsRouter from './controllers/admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/task', taskRouter);
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
