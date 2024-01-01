import { Router } from "express";
import { ProjectController } from "../controller/project.controller";
import { authReq } from "../middleware";

const projectRouter = Router();

const projectController = new ProjectController();

projectRouter.post("/", authReq(['admin']), projectController.register);
projectRouter.get("/", authReq(['admin']), projectController.search);
projectRouter.put("/", authReq(['admin']), projectController.update);
projectRouter.delete("/", authReq(['admin']), projectController.remove);

export { projectRouter };