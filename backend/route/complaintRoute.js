import express from "express";
import {
  listComplaint,
  registerComplaint,
} from "../controllers/complaintController.js";

const complaintRouter = express.Router();
complaintRouter.post("/reg-complaint", registerComplaint);
complaintRouter.get("/list-complaint", listComplaint);

export default complaintRouter;
