import { model, Schema, Types } from 'mongoose';

export interface IActivity {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  timestamp: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  timestamp: { type: Date, default: () => new Date() },
});

const Activity = model<IActivity>('Activity', activitySchema);
export default Activity;
