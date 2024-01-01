import { Router } from "express";
import { ProjectController } from "../controller/project.controller";
import { authReq } from "../middleware";

const projectRouter = Router();

const projectController = new ProjectController();

projectRouter.get("/", projectController.search);
projectRouter.post("/", authReq(['admin']), projectController.register);
projectRouter.put("/", authReq(['admin']), projectController.update);
projectRouter.delete("/", authReq(['admin']), projectController.remove);

export { projectRouter };