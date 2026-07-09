import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.ts';
import teamsRouter from './routes/teams.ts';
import activitiesRouter from './routes/activities.ts';
import leaderboardRouter from './routes/leaderboard.ts';
import workoutsRouter from './routes/workouts.ts';
import db from './config/database.ts';

const app = express();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const publicApiHost = codespaceName
  ? `https://${codespaceName}-8000.githubpreview.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', apiUrl: publicApiHost });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection is open');
});

app.listen(port, () => {
  console.log(`Backend listening on ${publicApiHost}`);
});
