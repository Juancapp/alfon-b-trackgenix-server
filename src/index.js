import express from 'express';
import mongoose from 'mongoose';

import projectRoutes from './routes/projects';

const app = express();
const port = 5000;

app.use(express.json());

app.use('/projects', projectRoutes);

const MONGO_URL = 'mongodb+srv://grupo-b:U7uZZXO4erJxLY5v@cluster0.xg4xgte.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('Failed connection to database', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('Connected to database');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server ready on port ${port}`);
      });
    }
  },
);
