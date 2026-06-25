const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Service",
  serviceSchema
);