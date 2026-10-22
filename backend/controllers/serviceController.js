import serviceModel from "../models/serviceModel.js";
// @desc   Register a new service
// @route  POST /api/services
// @access Public
export const registerService = async (req, res) => {
  try {
    const { user, userId, wardNo, serviceOpt, date } = req.body;

    const newService = new serviceModel({
      user,
      userId,
      wardNo,
      serviceOpt,
      date,
      adminAcceptStatus: false,
    });

    await newService.save();

    res.status(201).json({
      success: true,
      message: "Service registered successfully",
      data: newService,
    });
  } catch (error) {
    console.error("Register Service Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// @desc   List all services
// @route  GET /api/services
// @access Public or Protected (based on your app logic)
export const listServices = async (req, res) => {
  try {
    const services = await serviceModel.find().sort({ date: -1 }); // latest first

    res.status(200).json({ success: true, data: services });
  } catch (error) {
    console.error("List Services Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const updateAdminAcceptStatus = async (req, res) => {
  const { serviceId } = req.params;
  const { status } = req.body; // Expecting status as boolean

  try {
    const updatedService = await serviceModel.findByIdAndUpdate(
      serviceId,
      { adminAcceptStatus: status },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Admin accept status updated successfully",
      service: updatedService,
      success: true,
    });
  } catch (error) {
    console.error("Error updating admin accept status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
