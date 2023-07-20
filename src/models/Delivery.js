import mongoose from "mongoose";
import crypto from "crypto";

const deliverySchema = new mongoose.Schema(
  {
    delivery_id: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return crypto.randomBytes(8).toString("hex");
      },
    },

    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
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
      enum: ["open", "picked-up,", "in-transit", "delivered", "failed"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;
