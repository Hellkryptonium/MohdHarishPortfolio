import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const COUNTER_KEY = 'visitor-count';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const count = (await redis.get<number>(COUNTER_KEY)) || 0;
    res.status(200).json({ count });
  } else if (req.method === 'POST') {
    const count = await redis.incr(COUNTER_KEY);
    res.status(200).json({ count });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
