let mongoose = require("mongoose");

const UserOTPVerificationSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
});

const UserOTPVerificationModel = mongoose.model(
  "otp",
  UserOTPVerificationSchema
);

module.exports = { UserOTPVerificationModel };
