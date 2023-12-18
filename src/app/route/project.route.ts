import { Router } from "express";
import { ProjectController } from "../controller/project.controller";

const projectRouter = Router();

const projectController = new ProjectController();

projectRouter.get("/search", projectController.search);
projectRouter.get("/show", projectController.show);
projectRouter.post("/", projectController.register);
projectRouter.put("/", projectController.update);

export { projectRouter };