import { model, Schema } from 'mongoose';

export interface IWorkout {
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focusArea: string;
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  focusArea: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

const Workout = model<IWorkout>('Workout', workoutSchema);
export default Workout;
