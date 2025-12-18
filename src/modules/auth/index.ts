import { Elysia } from "elysia";
import { AuthModel } from "./model";

export const authController = new Elysia({ prefix: "/auth-module" })
  .use(AuthModel)
  .get("/status", () => ({ status: "auth module active" }));
