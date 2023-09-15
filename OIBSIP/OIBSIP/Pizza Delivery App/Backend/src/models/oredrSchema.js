import mongoose from "mongoose";
import Status from "../utils/Status";
const orderSchema = new mongoose.Schema(
  {
    pizza: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pizza",
          },
        },
      ],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ORDERED,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: String,
  },
  { timestamps: true }
);
export default mongoose.model("Order", orderSchema);
