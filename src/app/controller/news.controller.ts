import { Request, Response } from "express";
import NewsService from "../service/news.service";
import { ValidationExceptionError } from "../exception/validation.exception";
import { NewsCreateRequestSchema, NewsRemoveRequestSchema, NewsSearchRequestSchema, NewsUpdateRequestSchema } from "../schemas/news.schemas";
import { handleZodIssues } from "../helper/handleZodIssues";

export class NewsController {
  public async search(req: Request, res: Response) {
    const newsService = new NewsService();

    const result = NewsSearchRequestSchema.safeParse(req.query);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;
      
      const news = await newsService.search(data);
  
      res.status(200).send({data: news});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async register(req: Request, res: Response) {
    const newsService = new NewsService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = NewsCreateRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const news = await newsService.register(data);

      res.status(200).send({message: "✅ - Success - " + news.id + " - " + news.name  + " - added to News", data: news});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async update(req: Request, res: Response) {
    const newsService = new NewsService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = NewsUpdateRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const news = await newsService.update(data);

      res.status(200).send({message: "✅ - Success - " + news.id  + " updated.", data: news});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async remove(req: Request, res: Response) {
    const newsService = new NewsService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = NewsRemoveRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;
      
      const news = await newsService.remove(data);
  
      res.status(200).send({message: "🗑️ - Remotion Completed - " + news.id  + " deleted.", data: news});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };
}