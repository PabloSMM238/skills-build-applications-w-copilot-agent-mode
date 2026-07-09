import { Router } from 'express';
import Workout from '../models/Workout.ts';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json({ route: '/api/workouts/', workouts });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch workouts' });
  }
});

router.post('/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ route: '/api/workouts/', workout });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create workout', details: error });
  }
});

export default router;
