import { Router } from "express";
import { MembersController } from "../controller/member.controller";
import { authReq } from "../middleware";

const memberRouter = Router();

const memberController = new MembersController();

memberRouter.get("/", memberController.search);
memberRouter.post("/", authReq(['admin']), memberController.register);
memberRouter.put("/", authReq(['admin']), memberController.update);
memberRouter.delete("/", authReq(['admin']), memberController.remove);

export { memberRouter };