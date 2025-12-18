import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { auth } from "@/auth/config";
import { authController } from "@/modules/auth";
import { workspaceController } from "@/modules/workspace";

// Create Elysia instance with prefix
const app = new Elysia({ prefix: "/api" })
  .use(
    cors({
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    }),
  )
  .mount(auth.handler) // Mount Better Auth
  .use(authController)
  .use(workspaceController)
  .get("/health", () => ({ status: "ok" }));

// Export app type for Eden
export type App = typeof app;

// Export HTTP methods for Next.js
export const GET = app.fetch;
export const POST = app.fetch;
export const PUT = app.fetch;
export const DELETE = app.fetch;
export const PATCH = app.fetch;
export const OPTIONS = app.fetch;
