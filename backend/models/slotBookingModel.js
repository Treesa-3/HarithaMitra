import mongoose from "mongoose";

const slotBookingSchema = new mongoose.Schema(
  {
    wardNo: { type: String, required: true },
    userName: { type: String, required: true },
    userId: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    adminAcceptStatus: { type: Boolean, required: false },
    workerAcceptStatus: { type: Boolean, required: false },
  },
  { minimize: false }
);
const slotBookingModel =
  mongoose.models.slotBooking ||
  mongoose.model("slotBooking", slotBookingSchema);
export default slotBookingModel;
