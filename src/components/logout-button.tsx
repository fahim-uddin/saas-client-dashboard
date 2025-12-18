"use client";

import { Logout03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface LogoutButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm";
  showIcon?: boolean;
  showText?: boolean;
}

export function LogoutButton({
  variant = "outline",
  size = "default",
  showIcon = true,
  showText = true,
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut();
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
      console.error("Sign out error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoading}
    >
      {showIcon && (
        <HugeiconsIcon
          icon={Logout03Icon}
          className={showText ? "mr-2" : ""}
          size={16}
        />
      )}
      {showText && (isLoading ? "Signing out..." : "Sign out")}
    </Button>
  );
}
