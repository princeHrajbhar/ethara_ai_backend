import { JwtPayload } from "jsonwebtoken";

import { IProject } from "../modules/project/interfaces/project.interface.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | any;

      project?: IProject | any;
    }
  }
}