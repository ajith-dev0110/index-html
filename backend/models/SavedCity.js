import mongoose from 'mongoose';

const savedCitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  city: { type: String, required: [true, 'City name is required'], trim: true },
  country: { type: String, default: '' },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  savedAt: { type: Date, default: Date.now }
});

savedCitySchema.index({ userId: 1, city: 1 }, { unique: true });

export default mongoose.model('SavedCity', savedCitySchema);
