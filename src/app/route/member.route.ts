import { Router } from "express";
import { MembersController } from "../controller/member.controller";

const memberRouter = Router();

const memberController = new MembersController();

memberRouter.get("/search", memberController.member);
memberRouter.get("/show", memberController.members);

export { memberRouter };