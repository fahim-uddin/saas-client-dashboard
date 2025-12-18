import { Elysia, t } from "elysia";

export const WorkspaceModel = new Elysia().model({
  "workspace.create": t.Object({
    name: t.String({ minLength: 1, maxLength: 40 }),
    primaryProvider: t.Union([
      t.Literal("AWS"),
      t.Literal("GCP"),
      t.Literal("AZURE"),
    ]),
    providerConnected: t.Boolean(),
  }),
});
