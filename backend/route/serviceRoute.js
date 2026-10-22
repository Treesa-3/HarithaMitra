import express from "express";
import {
  registerService,
  listServices,
  updateAdminAcceptStatus,
} from "../controllers/serviceController.js";

const serviceRouter = express.Router();
serviceRouter.post("/reg-service", registerService);
serviceRouter.get("/list-service", listServices);
serviceRouter.put("/update-status/:serviceId", updateAdminAcceptStatus);

export default serviceRouter;
