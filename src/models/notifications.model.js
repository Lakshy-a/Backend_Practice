import mongoose from "mongoose";

const notificationsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notificationType: {
      type: String,
      enum: ["newMessage", "newComment", "newPost"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    readStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Notifications = mongoose.model(
  "Notification",
  notificationsSchema
);
