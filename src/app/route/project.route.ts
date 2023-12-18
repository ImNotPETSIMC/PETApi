import { Router } from "express";
import { ProjectController } from "../controller/project.controller";

const projectRouter = Router();

const projectController = new ProjectController();

projectRouter.post("/", projectController.register);
projectRouter.get("/", projectController.search);
projectRouter.put("/", projectController.update);
projectRouter.delete("/", projectController.remove);

export { projectRouter };