import { Request, Response } from "express";
import ProjectService from "../service/project.service";
import { ValidationExceptionError } from "../exception/validation.exception";
import { ProjectSearchRequestSchema, ProjectShowRequestSchema } from "../schemas";
import { handleZodIssues } from "../helper/handleZodIssues";

export class ProjectController {
  public async search(req: Request, res: Response) {
    const projectService = new ProjectService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = ProjectSearchRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;
      
      const project = await projectService.search(data.name);
  
      res.status(200).send(project);

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async show(req: Request, res: Response) {
    const projectService = new ProjectService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = ProjectShowRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;
      
      const projects = await projectService.show(data.status);
  
      res.status(200).send(projects);

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };
}