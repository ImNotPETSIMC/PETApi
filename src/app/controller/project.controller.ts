import { Request, Response } from "express";
import ProjectService from "../service/project.service";
import { ValidationExceptionError } from "../exception/validation.exception";
import { ProjectCreateRequestSchema, ProjectRemoveRequestSchema, ProjectSearchRequestSchema, ProjectUpdateRequestSchema } from "../schemas";
import { handleZodIssues } from "../helper/handleZodIssues";

export class ProjectController {
  public async search(req: Request, res: Response) {
    const projectService = new ProjectService();

    const result = ProjectSearchRequestSchema.safeParse(req.query);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;
      
      const project = await projectService.search(data);
  
      res.status(200).send({data: project});

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

  public async remove(req: Request, res: Response) {
    const projectService = new ProjectService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = ProjectRemoveRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;
      
      const project = await projectService.remove(data);
  
      res.status(200).send({message: "🗑️ - Remotion Completed - " + project.name  + " deleted.", data: project});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };
}