import { model, Schema, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin';
  joinedAt: Date;
  team?: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['athlete', 'coach', 'admin'], default: 'athlete' },
  joinedAt: { type: Date, default: () => new Date() },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
});

const User = model<IUser>('User', userSchema);
export default User;
