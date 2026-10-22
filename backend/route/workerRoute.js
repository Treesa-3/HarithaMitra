import express from "express";
import {
  loginWorker,
  registerWorker,
  updateWorker,
  listWorkers,
} from "../controllers/workerController.js";

const workerRouter = express.Router();
workerRouter.post("/register", registerWorker);
workerRouter.post("/login", loginWorker);
workerRouter.put("/update", updateWorker);
workerRouter.get("/list", listWorkers);

export default workerRouter;
