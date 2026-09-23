import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  query: { type: String, required: true, trim: true },
  city: { type: String, default: '' },
  country: { type: String, default: '' },
  lat: { type: Number },
  lon: { type: Number },
  temp: { type: Number },
  condition: { type: String },
  searchedAt: { type: Date, default: Date.now }
});

searchHistorySchema.index({ userId: 1, searchedAt: -1 });

export default mongoose.model('SearchHistory', searchHistorySchema);
