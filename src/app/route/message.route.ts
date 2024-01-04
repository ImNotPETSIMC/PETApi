import { Router } from "express";
import { MessageController } from "../controller/message.controller";
import { authReq } from "../middleware";

const messageRouter = Router();

const messageController = new MessageController();

messageRouter.post("/", messageController.register);
messageRouter.get("/", authReq(['admin']), messageController.search);
messageRouter.put("/", authReq(['admin']), messageController.update);
messageRouter.delete("/", authReq(['admin']), messageController.remove);

export { messageRouter };