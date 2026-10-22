import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    wardNo: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: Number, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { minimize: false }
);
const workerModel =
  mongoose.models.worker || mongoose.model("worker", workerSchema);
export default workerModel;
