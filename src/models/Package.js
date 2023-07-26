import mongoose from 'mongoose';
import crypto from 'crypto';

const packageSchema = new mongoose.Schema(
  {
    active_delivery_id: {
      type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Delivery',
    },

    description: {
      type: String,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    width: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    depth: {
      type: Number,
      required: true,
    },

    from_name: {
      type: String,
      required: true,
    },

    from_address: {
      type: String,
      required: true,
    },

    to_name: {
      type: String,
      required: true,
    },

    to_address: {
      type: String,
      required: true,
    },

    from_location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },

    to_location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

packageSchema.index({ description: 'text' });

const Package = mongoose.model('Package', packageSchema);

export default Package;
