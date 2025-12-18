import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProviderSelectCardProps extends React.ComponentProps<typeof Card> {
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export function ProviderSelectCard({
  selected,
  onClick,
  icon,
  title,
  description,
  className,
  ...props
}: ProviderSelectCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:border-primary/50 hover:bg-muted/50",
        selected
          ? "border-primary ring-2 ring-primary/20 bg-muted/30"
          : "border-border",
        className,
      )}
      {...props}
    >
      <CardHeader className="space-y-1 pb-2">
        <div className="flex items-center gap-2">
          {icon && <div className="text-2xl">{icon}</div>}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      {description && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      )}
    </Card>
  );
}
