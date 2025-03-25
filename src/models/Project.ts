import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  coverImage: { type: String },
  categories: [{ type: String }],
  status: { type: String, enum: ['live', 'development', 'concept'], required: true },
  hasNft: { type: Boolean, default: false },
  hasToken: { type: Boolean, default: false },
  website: { type: String },
  twitter: { type: String },
  discord: { type: String },
  owner: { type: String, required: true },
  tvl: { type: Number, default: 0 },
  monthlyRevenue: { type: Number, default: 0 },
  monthlyActiveUsers: { type: Number, default: 0 },
  nftFloorPrice: { type: Number, default: 0 },
  nftVolume: { type: Number, default: 0 },
  tokenSymbol: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema); 