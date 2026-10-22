import workerModel from "../models/workerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, "harithamithra123");
};

//routes for login
const loginWorker = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const worker = await workerModel.findOne({ userName });
    if (!worker)
      return res.json({ success: false, message: "worker doesnot exist" });
    if (password === worker.password) {
      const token = createToken(worker._id);
      res.json({ success: true, token, worker });
    } else {
      res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//routes for register
const registerWorker = async (req, res) => {
  try {
    const { name, wardNo, email, address, contact } = req.body;
    const exists = await workerModel.findOne({ wardNo });
    if (exists) {
      return res.json({ success: false, message: "worker already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    }
    const newWorker = new workerModel({
      name,
      wardNo,
      email,
      address,
      contact,
      password: `W-${wardNo}`,
      userName: `W-${wardNo}`,
    });
    const worker = await newWorker.save();
    const token = createToken(worker._id);
    res.json({ message: true, token, worker });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//update worker
const updateWorker = async (req, res) => {
  try {
    const { wardNo, name, address, contact, email, _id } = req.body;
    const updatedData = {
      name,
      wardNo,
      email,
      address,
      contact,
    };
    const updatedWorker = await workerModel.findByIdAndUpdate(
      _id,
      { $set: updatedData },
      { new: true, runValidators: true } // Return updated worker & validate data
    );

    if (!updatedWorker) {
      return res.json({ success: true, message: "worker not found" });
    }

    res.json({ success: true, updatedWorker });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Route for list all workers
const listWorkers = async (req, res) => {
  try {
    const workers = await workerModel.find({});

    if (!workers) {
      return res.json({ success: true, message: "workers not found" });
    }

    res.json({ success: true, workers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { loginWorker, registerWorker, updateWorker, listWorkers };
