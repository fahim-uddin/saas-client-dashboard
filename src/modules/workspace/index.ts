import { Elysia } from "elysia";
import { auth } from "@/auth/config";
import { WorkspaceModel } from "./model";
import { WorkspaceService } from "./service";

export const workspaceController = new Elysia({ prefix: "/workspace" })
  .use(WorkspaceModel)
  .post(
    "/create",
    async ({ body, set, request }) => {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      if (!session) {
        set.status = 401;
        return { error: "Unauthorized" };
      }

      const result = await WorkspaceService.create({
        ...body,
        ownerId: session.user.id,
      });
      return result;
    },
    {
      body: "workspace.create",
    },
  );
