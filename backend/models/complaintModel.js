import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    wardNo: { type: String, required: true },
    userName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: Number, required: true },
  },
  { minimize: false }
);
const complaintModel =
  mongoose.models.complaint || mongoose.model("complaint", complaintSchema);
export default complaintModel;
