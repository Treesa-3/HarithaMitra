import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    userId: { type: String, required: true },
    wardNo: { type: String, required: true },
    serviceOpt: { type: Array, required: true },
    date: { type: String, required: false },
    adminAcceptStatus: { type: Boolean, required: true },
  },
  { minimize: false }
);
const serviceModel =
  mongoose.models.service || mongoose.model("service", serviceSchema);
export default serviceModel;
