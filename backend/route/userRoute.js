import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  loginAdmin,
  listUsersWithWard,
  fetchUser,
  updateCollection,
  listUsers,
  addNotification,
  getNotifications,
  addNotificationToWardUsers,
  updateAllPaymentStatus,
} from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/update", updateUser);
userRouter.put("/delete", deleteUser);
userRouter.post("/admin/login", loginAdmin);
userRouter.post("/list-Ward", listUsersWithWard);
userRouter.post("/fetchUser", fetchUser);
userRouter.post("/list", listUsers);
userRouter.post("/add-collection", updateCollection);
userRouter.post("/notification/add-to-ward-users", addNotificationToWardUsers);
userRouter.post("/notification/:userName", addNotification);
userRouter.get("/notification/:userName", getNotifications);
userRouter.put("/:userId/payments", updateAllPaymentStatus);

export default userRouter;
