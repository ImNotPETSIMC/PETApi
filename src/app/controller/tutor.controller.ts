import { Request, Response } from "express";
import { ValidationExceptionError } from "../exception/validation.exception";
import TutorService from "../service/tutor.service";
import { TutorRemoveRequestSchema, TutorCreateRequestSchema, TutorSearchRequestSchema, TutorUpdateRequestSchema } from "../schemas/tutor.schemas";
import { handleZodIssues } from "../helper/handleZodIssues";

export class TutorsController {
  public async search(req: Request, res: Response) {
    const tutorService = new TutorService();
    
    const result = TutorSearchRequestSchema.safeParse(req.query);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }
    
    try {
      const { data } = result;

      const tutor = await tutorService.search(data);

      res.status(200).send({data: tutor});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message, data: result.data });
        return;
      }

      throw error;
    }
  }

  public async register(req: Request, res: Response) {
    const tutorService = new TutorService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = TutorCreateRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const tutor = await tutorService.register(data);

      res.status(200).send({message: "✅ - Success - " + tutor.name + " added to Tutors", data: tutor});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async remove(req: Request, res: Response) {
    const tutorService = new TutorService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = TutorRemoveRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const tutor = await tutorService.remove(data);

      res.status(200).send({message: "🗑️ - Remotion Completed - " + tutor.name + " - " + tutor.name  + " deleted.", data: tutor});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async update(req: Request, res: Response) {
    const tutorService = new TutorService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = TutorUpdateRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const tutor = await tutorService.update(data);

      res.status(200).send({message: "✅ - Success - " + tutor.name + " - " + tutor.name  + " updated", data: tutor});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };
}
