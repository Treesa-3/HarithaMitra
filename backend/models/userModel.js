import mongoose from "mongoose";

const wasteDataSchema = new mongoose.Schema(
  {
    collectionStatus: { type: Boolean, required: false },
    date: { type: String, required: false },
    Amount: { type: Number, required: false },
    paymentStatus: { type: Boolean, required: false },
    fine: { type: Number, required: false },
    plastic: { type: Number, required: false },
    eWaste: { type: Number, required: false },
    domestic: { type: Number, required: false },
  },
  { _id: false }
);

// ✅ Notification schema
const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "service", "complaint", etc.
    date: { type: Date, default: Date.now }, // optional, track when it was added
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    owner: { type: String, required: true },
    houseNo: { type: String, required: true },
    overDue: { type: Boolean, required: true },
    wardNo: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    wasteData: { type: [wasteDataSchema], default: [] },
    contact: { type: Number, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },

    // ✅ Notifications field
    notifications: { type: [notificationSchema], default: [] },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
