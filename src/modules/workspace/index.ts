import { Elysia } from "elysia";

export const workspaceController = new Elysia({ prefix: "/workspace" }).get(
  "/",
  () => ({ workspaces: [] }),
);
