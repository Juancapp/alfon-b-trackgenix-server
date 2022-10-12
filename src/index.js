import express from 'express';
import router from './resources/employees';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/employee', router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
