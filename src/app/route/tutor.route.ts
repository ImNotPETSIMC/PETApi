import { Router } from "express";
import { TutorsController } from "../controller/tutor.controller";
import { authReq } from "../middleware";

const tutorRouter = Router();

const tutorController = new TutorsController();

tutorRouter.get("/", tutorController.search);
tutorRouter.post("/", authReq(['admin']), tutorController.register);
tutorRouter.put("/", authReq(['admin']), tutorController.update);
tutorRouter.delete("/", authReq(['admin']), tutorController.remove);

export { tutorRouter };