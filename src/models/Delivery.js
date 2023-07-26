import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema(
  {
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: true,
    },

    pickup_time: { type: Date },
    start_time: { type: Date },
    end_time: { type: Date },

    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },

    status: {
      type: String,
      default: 'open',
      enum: ['open', 'picked-up,', 'in-transit', 'delivered', 'failed'],
    },
  },
  {
    timestamps: true,
  }
);

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;
