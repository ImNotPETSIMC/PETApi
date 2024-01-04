import { Router } from "express";
import { NewsController } from "../controller/news.controller";
import { authReq } from "../middleware";

const newsRouter = Router();

const newsController = new NewsController();

newsRouter.post("/", authReq(['admin']), newsController.register);
newsRouter.get("/", newsController.search);
newsRouter.put("/", authReq(['admin']), newsController.update);
newsRouter.delete("/", authReq(['admin']), newsController.remove);

export { newsRouter };