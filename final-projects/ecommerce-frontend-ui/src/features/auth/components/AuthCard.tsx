import type { PropsWithChildren, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type AuthCardProps = PropsWithChildren<{
  title: string;
  description: string;
  footer: ReactNode;
}>;

export default function AuthCard({
  title,
  description,
  footer,
  children,
}: AuthCardProps) {
  return (
    <Card className="w-full  max-w-md shadow-lg">
      <CardHeader className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
            E
          </div>

          <div className="space-y-1">
            <CardTitle className="text-2xl">{title}</CardTitle>

            <CardDescription>{description}</CardDescription>
          </div>
        </div>

        <Separator />
      </CardHeader>

      <CardContent>
        <div className="space-y-5">{children}</div>

        <div className="mt-6">{footer}</div>
      </CardContent>
    </Card>
  );
}
