import { Request, Response } from "express";
import ProjectService from "../service/project.service";
import { ValidationExceptionError } from "../exception/validation.exception";
import { ProjectCreateRequestSchema, ProjectSearchRequestSchema, ProjectShowRequestSchema, ProjectUpdateRequestSchema } from "../schemas";
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
  
      res.status(200).send({data: project});

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
  
      res.status(200).send({data: projects});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async register(req: Request, res: Response) {
    const projectService = new ProjectService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = ProjectCreateRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const project = await projectService.register(data);

      res.status(200).send({message: "✅ - Success - " + project.name  + " added to Projects", data: project});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async update(req: Request, res: Response) {
    const projectService = new ProjectService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = ProjectUpdateRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const project = await projectService.update(data);

      res.status(200).send({message: "✅ - Success - " + project.name  + " updated.", data: project});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };
}