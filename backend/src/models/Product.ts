import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    comparePrice: { type: Number },
    images: [{ type: String }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    sizes: [
      {
        size: { type: String },
        stock: { type: Number, default: 0 },
      },
    ],
    colors: [
      {
        name: { type: String },
        hex: { type: String },
      },
    ],
    material: { type: String },
    brand: { type: String, default: 'LUXE THREADS' },
    tags: [{ type: String }],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    modelUrl: { type: String },
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

export const Product = mongoose.model('Product', productSchema);
