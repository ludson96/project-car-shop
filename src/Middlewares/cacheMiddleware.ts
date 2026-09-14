import { Request, Response, NextFunction } from 'express';
import redisClient from '../utils/redisClient';

const interceptResponseJson = (
  res: Response,
  key: string,
  ttlSeconds: number,
) => {
  const originalSend = res.json.bind(res);
  res.json = (body: unknown) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      redisClient?.setex(key, ttlSeconds, JSON.stringify(body)).catch(() => {});
    }
    return originalSend(body);
  };
};

export const cacheMiddleware = (prefix: string, ttlSeconds = 60) => (
  async (req: Request, res: Response, next: NextFunction) => {
    if (redisClient?.status !== 'ready') return next();

    const key = `${prefix}:${req.originalUrl || req.url}`;
    try {
      const cached = await redisClient.get(key);
      if (cached) {
        res.setHeader('X-Cache', 'HIT');
        return res.status(200).json(JSON.parse(cached));
      }
      res.setHeader('X-Cache', 'MISS');
      interceptResponseJson(res, key, ttlSeconds);
      return next();
    } catch (err) {
      return next();
    }
  }
);

export const invalidateCache = async (pattern: string) => {
  if (redisClient?.status !== 'ready') return;
  try {
    const keys = await redisClient.keys(`${pattern}*`);
    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
  } catch (error) {
    // silencioso para resiliência
  }
};
