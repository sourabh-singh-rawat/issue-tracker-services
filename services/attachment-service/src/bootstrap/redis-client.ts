import Redis from "ioredis";
import { env } from "@/bootstrap/env";

export const redisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});
