import Redis from 'ioredis';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;

const createRedisClient = (): Redis | null => {
  try {
    const client = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
      maxRetriesPerRequest: 1,
      retryStrategy: () => null,
      lazyConnect: true,
    });

    client.connect().catch(() => {});
    return client;
  } catch (error) {
    return null;
  }
};

const redisClient = createRedisClient();

export default redisClient;
