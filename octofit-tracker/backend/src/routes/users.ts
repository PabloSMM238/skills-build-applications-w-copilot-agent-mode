import { Router } from 'express';
import User from '../models/User.ts';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('team');
    res.json({ route: '/api/users/', users });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ route: '/api/users/', user });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create user', details: error });
  }
});

export default router;
