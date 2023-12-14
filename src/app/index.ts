import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { memberRouter } from "./route/member.route";
import { projectRouter } from "./route/project.route";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.route();
  }

  middleware() {
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(cors());
  }

  route() {
    this.app.use("/member", memberRouter);
    this.app.use("/project", projectRouter);
  }
}

export default new App().app;
