import { Router } from 'express';
import Activity from '../models/Activity.ts';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().populate('user team');
    res.json({ route: '/api/activities/', activities });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities' });
  }
});

router.post('/', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ route: '/api/activities/', activity });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create activity', details: error });
  }
});

export default router;
