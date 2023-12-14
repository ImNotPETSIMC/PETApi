import { Router } from "express";
import { ProjectController } from "../controller/project.controller";

const projectRouter = Router();

const projectController = new ProjectController();

projectRouter.get("/search", projectController.search);
projectRouter.get("/show", projectController.show);

export { projectRouter };