const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = new Schema(
  {

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'role',
      default: null
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);



module.exports = User;
