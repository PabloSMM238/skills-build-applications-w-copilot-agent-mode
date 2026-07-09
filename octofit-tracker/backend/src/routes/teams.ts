import { Router } from 'express';
import Team from '../models/Team.ts';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('members');
    res.json({ route: '/api/teams/', teams });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch teams' });
  }
});

router.post('/', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ route: '/api/teams/', team });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create team', details: error });
  }
});

export default router;
