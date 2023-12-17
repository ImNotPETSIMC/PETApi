import { Request, Response } from "express";
import { ValidationExceptionError } from "../exception/validation.exception";
import MemberService from "../service/member.service";
import { MemberRequestSchema, MemberSearchRequestSchema, MemberShowRequestSchema } from "../schemas";
import { handleZodIssues } from "../helper/handleZodIssues";

export class MembersController {
  public async search(req: Request, res: Response) {
    const memberService = new MemberService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = MemberSearchRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }
    
    try {
      const { data } = result;

      const member = await memberService.search(data.matricula);

      res.status(200).send(member);

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  }

  public async show(req: Request, res: Response) {
    const memberService = new MemberService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = MemberShowRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;
      
      const members = await memberService.show(data.status);

      res.status(200).send(members);

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  }

  public async register(req: Request, res: Response) {
    const memberService = new MemberService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = MemberRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const member = await memberService.register(data);

      res.status(200).send({message: "✅ - Success - " + member.data.matricula + " - " + member.data.name  + " added to Membros", data: member});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async remove(req: Request, res: Response) {
    const memberService = new MemberService();
    
    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }
    
    const result = MemberSearchRequestSchema.safeParse(req.body.data);
    
    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const member = await memberService.remove(data.matricula);

      res.status(200).send({message: "🗑️ - Remotion Completed - " + member.data.matricula + " - " + member.data.name  + " deleted.", data: member});

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };
}
