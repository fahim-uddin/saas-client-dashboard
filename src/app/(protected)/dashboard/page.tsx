import { LogoutButton } from "@/components/logout-button";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your cloud dashboard.
          </p>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
