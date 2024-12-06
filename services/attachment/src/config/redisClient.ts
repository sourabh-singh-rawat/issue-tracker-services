import Redis from "ioredis";

export const redisClient = new Redis({
  host: process.env.ATTACHMENT_REDIS_HOST,
  port: process.env.ATTACHMENT_REDIS_PORT
    ? parseInt(process.env.ATTACHMENT_REDIS_PORT)
    : 6379,
  maxRetriesPerRequest: null,
});
