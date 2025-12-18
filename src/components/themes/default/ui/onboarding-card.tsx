import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OnboardingCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
}

export function OnboardingCard({
  className,
  children,
  ...props
}: OnboardingCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-md mx-auto shadow-none border-border/50 bg-background/50 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

export {
  CardContent as OnboardingCardContent,
  CardDescription as OnboardingCardDescription,
  CardFooter as OnboardingCardFooter,
  CardHeader as OnboardingCardHeader,
  CardTitle as OnboardingCardTitle,
};
