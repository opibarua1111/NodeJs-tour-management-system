const { mongoose } = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this service"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [5, "Name must be at least 5 characters."],
      maxLength: [150, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    view: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

tourSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};
var collectionName = "tours";

const Tours = mongoose.model("Tours", tourSchema, collectionName);

module.exports = Tours;
