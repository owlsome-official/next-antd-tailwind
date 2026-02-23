import { CacheHandler } from "@fortedigital/nextjs-cache-handler";
import createLruHandler from "@fortedigital/nextjs-cache-handler/local-lru";
import createRedisHandler from "@fortedigital/nextjs-cache-handler/redis-strings";
import { PHASE_PRODUCTION_BUILD } from "next/constants.js";
import { createClient } from "redis";

CacheHandler.onCreation(({ buildId }) => {
  if (global.cacheHandlerConfig) {
    return global.cacheHandlerConfig;
  }

  if (global.cacheHandlerConfigPromise) {
    return global.cacheHandlerConfigPromise;
  }

  if (process.env.NODE_ENV === "development" || !process.env.REDIS_URL) {
    const lruCache = createLruHandler();
    return { handlers: [lruCache] };
  }

  global.cacheHandlerConfigPromise = (async () => {
    let redisClient = null;

    if (PHASE_PRODUCTION_BUILD !== process.env.NEXT_PHASE) {
      try {
        redisClient = createClient({
          url: process.env.REDIS_URL,
          pingInterval: 10000,
        });
        redisClient.on("error", (e) => {
          if (typeof process.env.NEXT_PRIVATE_DEBUG_CACHE !== "undefined") {
            console.warn("Redis error", e);
          }
          global.cacheHandlerConfig = null;
          global.cacheHandlerConfigPromise = null;
        });
      } catch (error) {
        console.warn("Failed to create Redis client:", error);
      }
    }

    if (redisClient) {
      try {
        await redisClient.connect();
      } catch (error) {
        console.warn("Failed to connect Redis client:", error);
        await redisClient
          .close()
          .catch((e) =>
            console.warn("Failed to quit Redis client after connect failure.", e)
          );
      }
    }

    const lruCache = createLruHandler();

    if (!redisClient?.isReady) {
      global.cacheHandlerConfigPromise = null;
      global.cacheHandlerConfig = { handlers: [lruCache] };
      return global.cacheHandlerConfig;
    }

    const redisCacheHandler = createRedisHandler({
      client: redisClient,
      keyPrefix: `${process.env.REDIS_KEY_PREFIX ?? "nextjs"}:${buildId}:`,
    });

    global.cacheHandlerConfigPromise = null;
    global.cacheHandlerConfig = {
      handlers: [redisCacheHandler, lruCache],
    };

    return global.cacheHandlerConfig;
  })();

  return global.cacheHandlerConfigPromise;
});

export default CacheHandler;
