import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './DB.js';
import redisConnection from './redis/connection.js';

dotenv.config();

const port = process.env.PORT || 8900;

(async () => {
  const redisClient = await redisConnection();
  await connectDB();

  app.locals.redisClient = redisClient; // attach to app for global use

  app.listen(port, () => {
    console.log(`Server is Running: localhost:${port}`);
  });
})();
