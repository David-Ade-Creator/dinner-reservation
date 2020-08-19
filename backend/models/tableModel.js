import mongoose from 'mongoose';

  const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, default: 0 },
      comment: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  const tableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    type: { type: String, required: true },
    countInStock: { type: Number, default: 0, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    reviews: [reviewSchema],
  });

const tableModel = mongoose.model('Table', tableSchema);

export default tableModel;