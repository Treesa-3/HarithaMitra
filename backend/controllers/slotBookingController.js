import slotBookingModel from "../models/slotBookingModel.js";
/**
 * @desc Register a new slot booking
 * @route POST /api/slot-bookings
 * @access Public
 */
export const registerSlotBooking = async (req, res) => {
  try {
    const { wardNo, userName, userId, date, time, location } = req.body;

    // Validation (basic)
    if (!wardNo || !userName || !userId || !date || !time || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSlotBooking = new slotBookingModel({
      wardNo,
      userName,
      userId,
      date,
      time,
      location,
      adminAcceptStatus: false,
      workerAcceptStatus: false,
    });

    const savedBooking = await newSlotBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error registering slot booking", error });
  }
};

/**
 * @desc Get all slot bookings
 * @route GET /api/slot-bookings
 * @access Public or Admin (based on your auth)
 */
export const listSlotBookings = async (req, res) => {
  try {
    const bookings = await slotBookingModel.find();
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching slot bookings", error });
  }
};

export const updateAdminWorkerAcceptStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin } = req.body;
    let updatedSlot;
    if (admin) {
      updatedSlot = await slotBookingModel.findByIdAndUpdate(
        id,
        { adminAcceptStatus: status },
        { new: true }
      );
      if (!updatedSlot) {
        return res.status(404).json({ message: "Slot booking not found" });
      }
    } else {
      updatedSlot = await slotBookingModel.findByIdAndUpdate(
        id,
        { workerAcceptStatus: status },
        { new: true }
      );
      if (!updatedSlot) {
        return res.status(404).json({ message: "Slot booking not found" });
      }
    }

    res.status(200).json({ success: true, data: updatedSlot });
  } catch (error) {
    console.error("Error updating admin accept status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
