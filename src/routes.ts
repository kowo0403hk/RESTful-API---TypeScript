// when importing with capital letter, it means we are importing the interface
import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema } from "./schema/user.schema";

// basically, all the routes here will go through their respective middlewares to validate request, and then move onto next(), which is the respective hanlder function, and those handler functions are controllers for routing

export default function router(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user(/api/user)
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login POST (/api/sessions)

  // Get the user's sessions GET (/api/sessions)

  // Logout DELETE (/api/sessions)

  // Posts
  // GET /api/posts/:id
}
