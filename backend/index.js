import express from "express";
import mongoose from "mongoose";
import userRouter from "./route/userRoute.js";
import workerRouter from "./route/workerRoute.js";
import serviceRouter from "./route/serviceRoute.js";
import cors from "cors";
import complaintRouter from "./route/complaintRoute.js";
import slotBookingRouter from "./route/slotBookingRoute.js";
import adminRoutes from "./route/adminRoute.js";

//app config
const app = express();
const port = 8000;
//middlewares
app.use(express.json());
app.use(cors());

//connecting mongodb

mongoose
  .connect(
    "mongodb+srv://alphonsrenny:Uac4NuZZf6dUnryf@cluster0.tn1ub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("connection failed", err);
  });

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/worker", workerRouter);
app.use("/api/service", serviceRouter);
app.use("/api/complaint", complaintRouter);
app.use("/api/slot", slotBookingRouter);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("server is running");
});
app.listen(port, "0.0.0.0", () => console.log("server started on port" + port));
