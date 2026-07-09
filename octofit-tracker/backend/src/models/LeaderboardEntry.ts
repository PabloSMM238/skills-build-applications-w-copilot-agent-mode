import { model, Schema, Types } from 'mongoose';

export interface ILeaderboardEntry {
  team: Types.ObjectId;
  score: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() },
});

const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export default LeaderboardEntry;
