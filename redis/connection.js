// redis/connection.js
import { createClient } from "redis";
import dotenv from 'dotenv';

dotenv.config();    

let redisClient;

// singleton connection function
const redisConnection = async () => {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.CONNECT_REDIS });
    redisClient.on("error", (err) => console.error("Redis Error:", err));
    await redisClient.connect();
    console.log("Redis connected successfully");
  }
  return redisClient;
};

export default redisConnection;

// const client = createClient({
//     username: 'default',
//     password: 'NhtOFKmva8LbtwpzoYeJDgmjVki6NR1c',
//     socket: {
//         host: 'redis-16423.c270.us-east-1-3.ec2.cloud.redislabs.com',
//         port: 16423
//     }
// });

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)
