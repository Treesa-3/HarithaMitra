import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, "harithamithra123");
};

//admin Credentials
const ADMIN_UID = "Admin";
const ADMIN_PASSWORD = "admin";

//routes for login
const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await userModel.findOne({ userName });
    if (!user)
      return res.json({ success: false, message: "user doesnot exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token, user });
    } else {
      res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//routes for register
const registerUser = async (req, res) => {
  try {
    const { owner, wardNo, houseNo, email, address, contact, password } =
      req.body;
    const exists = await userModel.findOne({ houseNo });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      overDue: false,
      owner,
      wardNo,
      houseNo,
      email,
      address,
      contact,
      password: hashedPassword,
      userName: `U-${houseNo}`,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ message: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//route for update user
const updateUser = async (req, res) => {
  try {
    const { wardNo, owner, address, contact, houseNo, email, _id } = req.body;
    const updatedData = {
      owner,
      wardNo,
      houseNo,
      email,
      address,
      contact,
    };
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      { $set: updatedData },
      { new: true, runValidators: true } // Return updated user & validate data
    );

    if (!updatedUser) {
      return res.json({ success: true, message: "user not found" });
    }

    res.json({ success: true, updatedUser });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//route for delete user
const deleteUser = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id, "ID");
    const deletedUser = await userModel.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.json({ success: true, message: "user not found" });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//route for login admin
const loginAdmin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (userName === ADMIN_UID && password === ADMIN_PASSWORD) {
      const token = jwt.sign(userName + password, "harithamithra123");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//route for user with in specific Ward
const listUsersWithWard = async (req, res) => {
  try {
    const { wardNo } = req.body;
    const users = await userModel.find({ wardNo });

    if (!users) {
      return res.json({ success: false, message: "user doesnot exist" });
    }
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//route for user with HouseNo
const fetchUser = async (req, res) => {
  try {
    const { houseNo } = req.body;
    const user = await userModel.find({ houseNo });

    if (!user) {
      return res.json({ success: false, message: "user doesnot exist" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//route for update wast Collection
const updateCollection = async (req, res) => {
  const { _id, collectionData } = req.body;
  console.log(_id, collectionData, "id and data");

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      { $push: { wasteData: collectionData } }, // Append new waste object
      { new: true } // Return updated document
    );
    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Waste data added successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//list all users
const listUsers = async (req, res) => {
  try {
    const userList = await userModel.find();

    if (!userList) {
      return res.json({ success: false, message: "user doesnot exist" });
    }
    res.json({ success: true, userList });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addNotification = async (req, res) => {
  const { userName } = req.params;
  const { message, type } = req.body;

  try {
    const user = await userModel.findOne({ userName });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newNotification = { message, type };
    user.notifications.push(newNotification);

    await user.save();
    res.status(200).json({
      message: "Notification added successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error adding notification:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Get all notifications for a user
// @route   GET /api/notifications/:userId
// @access  Public or Protected (based on your setup)
const getNotifications = async (req, res) => {
  const { userName } = req.params;

  try {
    const user = await userModel.findById(userName).select("notifications");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ notifications: user.notifications });
  } catch (error) {
    console.error("Error getting notifications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addNotificationToWardUsers = async (req, res) => {
  const { wardNo, message, type } = req.body;

  if (!wardNo || !message || !type) {
    return res
      .status(400)
      .json({ message: "wardNo, message and type are required" });
  }

  try {
    const result = await userModel.updateMany(
      { wardNo },
      {
        $push: {
          notifications: {
            message,
            type,
            date: new Date().toISOString(),
          },
        },
      }
    );

    res.status(200).json({
      message: `Notification added to users in ward ${wardNo}`,
      matchedUsers: result.matchedCount,
      modifiedUsers: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error adding notification to ward users:", error);
    res
      .status(500)
      .json({ message: "Server error while adding notifications" });
  }
};

const updateAllPaymentStatus = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updated = false;

    // Loop through wasteData and update each entry
    user.wasteData = user.wasteData.map((entry) => {
      if (entry.paymentStatus === false) {
        updated = true;
        return { ...entry, paymentStatus: true, fine: false };
      }
      return entry;
    });

    if (updated) {
      await user.save();
      return res.status(200).json({
        message: "All pending payments marked as paid.",
        success: true,
      });
    } else {
      return res
        .status(200)
        .json({ message: "No pending payments found.", success: false });
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export {
  fetchUser,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  loginAdmin,
  listUsersWithWard,
  updateCollection,
  listUsers,
  addNotification,
  getNotifications,
  addNotificationToWardUsers,
  updateAllPaymentStatus,
};
