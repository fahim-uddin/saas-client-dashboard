import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import { auth } from "@/auth/config";
import { WorkspaceService } from "@/modules/workspace/service";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const workspaces = await WorkspaceService.getByUserId(session.user.id);

  if (workspaces.length === 0) {
    redirect("/onboarding");
  }

  return <>{children}</>;
}
