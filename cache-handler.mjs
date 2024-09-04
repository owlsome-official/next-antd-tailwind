import { CacheHandler } from "@neshca/cache-handler";
import createLruHandler from "@neshca/cache-handler/local-lru";
import createRedisHandler from "@neshca/cache-handler/redis-strings";
import { createClient } from "redis";

const redisURL = process.env.REDIS_URL ?? "redis://localhost:6379/0";
const client = createClient({
  url: redisURL,
  name: "next-cache",
});

client.on("error", (error) => {
  console.error({ title: "Redis Error", err: error, msg: error?.message });
});

CacheHandler.onCreation(async ({ buildId }) => {
  let redisHandler;

  if (buildId) {
    await client.connect();

    const keyPrefix = `next-cache-${buildId}:`;
    redisHandler = createRedisHandler({
      client,
      timeoutMs: 5000,
      keyPrefix,
    });
    console.info({
      buildId,
      redisURL,
      connection: "connected",
      isReady: client.isReady,
      isOpen: client.isOpen,
      keyPrefix,
    });
  }

  const localHandler = createLruHandler();
  return {
    handlers: [redisHandler, localHandler],
  };
});

export default CacheHandler;
