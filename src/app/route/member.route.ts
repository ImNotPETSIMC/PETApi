import { Router } from "express";
import { MembersController } from "../controller/member.controller";

const memberRouter = Router();

const memberController = new MembersController();

memberRouter.get("/search", memberController.search);
memberRouter.get("/show", memberController.show);
memberRouter.post("/", memberController.register);
memberRouter.put("/", memberController.update);
memberRouter.delete("/", memberController.remove);

export { memberRouter };