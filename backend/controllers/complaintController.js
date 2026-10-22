import complaintModel from "../models/complaintModel.js";

/**
 * @desc Register a new complaint
 * @route POST /api/complaints
 * @access Public
 */
const registerComplaint = async (req, res) => {
  try {
    const { type, wardNo, userName, description, location, contact } = req.body;

    // Validation
    if (
      !type ||
      !wardNo ||
      !userName ||
      !description ||
      !location ||
      !contact
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new complaint
    const newComplaint = new complaintModel({
      type,
      wardNo,
      userName,
      description,
      location,
      contact,
    });

    await newComplaint.save();

    res.status(201).json({
      message: "Complaint registered successfully",
      complaint: newComplaint,
    });
  } catch (error) {
    console.error("Register Complaint Error:", error);
    res
      .status(500)
      .json({ message: "Server error while registering complaint" });
  }
};

const listComplaint = async (req, res) => {
  try {
    const complaintList = await complaintModel.find();
    if (!complaintList) {
      return res.json({
        success: false,
        message: "complaint list doesnot exist",
      });
    }
    res.json({ success: true, complaintList });
  } catch (error) {
    console.error("list Complaint Error:", error);
    res
      .status(500)
      .json({ message: "Server error while registering complaint" });
  }
};

export { listComplaint, registerComplaint };
