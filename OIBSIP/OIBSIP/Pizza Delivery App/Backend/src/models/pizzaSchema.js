import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a pizza name"],
      maxLength: [60, "Pizza name should be less than 60 chars"],
    },
    description: {
      type: String,
      required: [true, "Please provide the description for pizza"],
      maxLength: [200, "Pizza description should be less than 200 chars"],
    },
    photo: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      baseOptions: [
        {
          text: { type: String, required: true },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      sauceOptions: [
        {
          text: { type: String, required: true },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      cheeseOptions: [
        {
          text: { type: String, required: true },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      veggieOptions: [
        {
          text: { type: String, required: true },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pizza", pizzaSchema);
