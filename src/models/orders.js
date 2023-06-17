const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
  },
  payerId: {
    type: String,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
   address: {
    recipientName: {
        type: String,
        required: true,
      },
    addressLine1: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country_code: {
      type: String,
      required: false,
    },
}
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
