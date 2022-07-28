// when importing with capital letter, it means we are importing the interface
import { Express, Request, Response } from "express";

export default function router(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user(/api/user)
  app.post("/api/users");

  // Login POST (/api/sessions)

  // Get the user's sessions GET (/api/sessions)

  // Logout DELETE (/api/sessions)

  // Posts
  // GET /api/posts/:id
}
