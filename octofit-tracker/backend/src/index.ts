import express from 'express';
import mongoose from 'mongoose';
import db from './config/database';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connection is open');
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
