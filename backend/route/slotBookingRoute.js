import express from "express";
import {
  listSlotBookings,
  registerSlotBooking,
  updateAdminWorkerAcceptStatus,
} from "../controllers/slotBookingController.js";

const slotBookingRouter = express.Router();
slotBookingRouter.post("/reg-slotBooking", registerSlotBooking);
slotBookingRouter.get("/list-slotBooking", listSlotBookings);
slotBookingRouter.post("/:id", updateAdminWorkerAcceptStatus);

export default slotBookingRouter;
