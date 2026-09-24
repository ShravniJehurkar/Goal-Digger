import express, { type Request, type Response } from "express";
import { registerRoutes } from "../server/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let routesPromise: Promise<unknown> | null = null;

async function initializeRoutes() {
  if (!routesPromise) {
    routesPromise = Promise.resolve(registerRoutes(app));
  }

  await routesPromise;
}

export default async function handler(req: Request, res: Response) {
  await initializeRoutes();
  return app(req, res);
}