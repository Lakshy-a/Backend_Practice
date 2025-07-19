import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },
    adminEmail: {
      type: String,
      required: true,
      unique: true,
    },
    adminPassword: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: 'admin'
    }
  },
  { timestamps: true },
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("adminPassword")) return next();
  this.adminPassword = await bcrypt.hash(this.adminPassword, 10);
  next();
});

export const Admin = mongoose.model("Admin", adminSchema);
