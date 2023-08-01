import app from './app';
import env from './utils/validateEnv';
import mongoose from 'mongoose';
const PORT = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('Database is connected');
    app.listen(PORT, () => {
      console.log('Server is up and running on port: ' + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
