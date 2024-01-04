import { Request, Response } from "express";
import MessageService from "../service/message.service";
import { ValidationExceptionError } from "../exception/validation.exception";
import { MessageCreateRequestSchema, MessageRemoveRequestSchema, MessageSearchRequestSchema, MessageUpdateRequestSchema } from "../schemas/message.schemas";
import { handleZodIssues } from "../helper/handleZodIssues";

export class MessageController {
  public async register(req: Request, res: Response) {
    const messageService = new MessageService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = MessageCreateRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const message = await messageService.register(data);

      res.status(200).send({message: "✅ - Success - " + message.id  + " added to Messages", data: message});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async search(req: Request, res: Response) {
    const messageService = new MessageService();

    const result = MessageSearchRequestSchema.safeParse(req.query);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;
      
      const message = await messageService.search(data);
  
      res.status(200).send({data: message});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async update(req: Request, res: Response) {
    const messageService = new MessageService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = MessageUpdateRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const message = await messageService.update(data);

      res.status(200).send({message: "✅ - Success - " + message.name  + " updated.", data: message});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async remove(req: Request, res: Response) {
    const messageService = new MessageService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = MessageRemoveRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;
      
      const message = await messageService.remove(data);
  
      res.status(200).send({message: "🗑️ - Remotion Completed - " + message.name  + " deleted.", data: message});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };
}