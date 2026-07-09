import mongoose from 'mongoose';
import User from '../models/User.ts';
import Team from '../models/Team.ts';
import Activity from '../models/Activity.ts';
import LeaderboardEntry from '../models/LeaderboardEntry.ts';
import Workout from '../models/Workout.ts';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.create([
      {
        name: 'Ocean Sprint',
        description: 'A high-energy team focused on speed workouts and group challenges.',
        members: [],
      },
      {
        name: 'Mountain Pulse',
        description: 'Endurance-driven athletes tackling strength and long-run routines.',
        members: [],
      },
    ]);

    const users = await User.create([
      {
        name: 'Avery Chen',
        email: 'avery.chen@example.com',
        role: 'athlete',
        joinedAt: new Date('2026-01-15'),
        team: teams[0]._id,
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        role: 'coach',
        joinedAt: new Date('2025-11-09'),
        team: teams[0]._id,
      },
      {
        name: 'Maya Patel',
        email: 'maya.patel@example.com',
        role: 'athlete',
        joinedAt: new Date('2026-02-20'),
        team: teams[1]._id,
      },
      {
        name: 'Ethan Brooks',
        email: 'ethan.brooks@example.com',
        role: 'athlete',
        joinedAt: new Date('2026-03-08'),
        team: teams[1]._id,
      },
    ]);

    await Team.updateOne({ _id: teams[0]._id }, { members: [users[0]._id, users[1]._id] });
    await Team.updateOne({ _id: teams[1]._id }, { members: [users[2]._id, users[3]._id] });

    const workouts = await Workout.create([
      {
        title: 'HIIT Power Circuit',
        description: 'A fast-paced interval workout that blends cardio bursts with strength moves.',
        durationMinutes: 35,
        difficulty: 'intermediate',
        focusArea: 'full body',
      },
      {
        title: 'Endurance Climb',
        description: 'Long steady-state session designed to build aerobic stamina.',
        durationMinutes: 50,
        difficulty: 'advanced',
        focusArea: 'cardio',
      },
      {
        title: 'Core Activation Flow',
        description: 'A beginner-friendly core routine for better posture and stability.',
        durationMinutes: 25,
        difficulty: 'beginner',
        focusArea: 'core',
      },
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'interval run',
        durationMinutes: 28,
        caloriesBurned: 340,
        timestamp: new Date('2026-07-05T09:00:00Z'),
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'steady cycle',
        durationMinutes: 42,
        caloriesBurned: 480,
        timestamp: new Date('2026-07-05T11:00:00Z'),
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'strength training',
        durationMinutes: 38,
        caloriesBurned: 390,
        timestamp: new Date('2026-07-06T07:15:00Z'),
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'recovery yoga',
        durationMinutes: 30,
        caloriesBurned: 180,
        timestamp: new Date('2026-07-06T18:00:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      {
        team: teams[0]._id,
        score: 1890,
        rank: 1,
        updatedAt: new Date('2026-07-06T19:00:00Z'),
      },
      {
        team: teams[1]._id,
        score: 1625,
        rank: 2,
        updatedAt: new Date('2026-07-06T19:00:00Z'),
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log(`Inserted ${users.length} users, ${teams.length} teams, ${workouts.length} workouts.`);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
