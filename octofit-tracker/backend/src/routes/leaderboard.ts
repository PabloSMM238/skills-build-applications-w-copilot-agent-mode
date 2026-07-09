import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.ts';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('team').sort('rank');
    res.json({ route: '/api/leaderboard/', leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard' });
  }
});

export default router;
