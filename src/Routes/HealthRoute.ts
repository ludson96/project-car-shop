import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import redisClient from '../utils/redisClient';

const router = Router();

const getMongoStatus = (): string => (
  mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
);

const getRedisStatus = (): string => {
  if (redisClient?.status === 'ready') return 'connected';
  return 'disconnected/disabled';
};

router.get('/', (_req: Request, res: Response) => {
  const mongo = getMongoStatus();
  const redis = getRedisStatus();
  const isUp = mongo === 'connected';

  const health = {
    status: isUp ? 'UP' : 'DOWN',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: { mongodb: mongo, redis },
    version: '2.0.0',
  };

  return res.status(isUp ? 200 : 503).json(health);
});

export default router;
