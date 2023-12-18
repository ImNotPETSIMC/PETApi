import { Router } from "express";
import { MembersController } from "../controller/member.controller";

const memberRouter = Router();

const memberController = new MembersController();

memberRouter.get("/", memberController.search);
memberRouter.post("/", memberController.register);
memberRouter.put("/", memberController.update);
memberRouter.delete("/", memberController.remove);

export { memberRouter };