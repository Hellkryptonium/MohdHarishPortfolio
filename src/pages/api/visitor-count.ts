import { NextApiRequest, NextApiResponse } from 'next';

// In a real app, this would be stored in a database
// For this example, we'll use a simple in-memory storage
let visitorCount = 0;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return the current count
    res.status(200).json({ count: visitorCount });
  } else if (req.method === 'POST') {
    // Increment the count
    visitorCount++;
    res.status(200).json({ count: visitorCount });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
