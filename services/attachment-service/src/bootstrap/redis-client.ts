import Redis from "ioredis";
import { env } from "@/bootstrap/env";

export const redisClient = new Redis({
  host: env.ATTACHMENT_REDIS_HOST,
  port: Number.parseInt(env.ATTACHMENT_REDIS_PORT, 10),
  maxRetriesPerRequest: null,
});
