import { Request, Response } from "express";
import { ValidationExceptionError } from "../exception/validation.exception";
import MemberService from "../service/member.service";

export class MembersController {
  public async member(req: Request, res: Response) {
    const memberService = new MemberService();

    const { data } = req.body;

    if (!data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    try {
      const member = await memberService.search(data);

      res.status(200).send(member);

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  }

  public async members(req: Request, res: Response) {
    const memberService = new MemberService();

    const { data } = req.body;

    if (!data || !data.status ) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    try {
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
}
