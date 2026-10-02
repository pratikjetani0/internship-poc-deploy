import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/app/router/routes";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthCard from "../components/AuthCard";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "../api/auth.mutations";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: (response) => {
        navigate(
          response.user.role === "ADMIN" ? ROUTES.DASHBOARD : ROUTES.HOME,
          {
            replace: true,
          },
        );
      },
    });
  };

  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to your account"
      footer={
        <>
          <Separator />

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="font-medium text-primary hover:underline"
            >
              Create Account
            </Link>
          </p>
        </>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Field invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>

          <FieldContent>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              disabled={loginMutation.isPending}
              {...form.register("email")}
            />

            <FieldError errors={[form.formState.errors.email]} />
          </FieldContent>
        </Field>

        <Field invalid={!!form.formState.errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>

          <FieldContent>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              disabled={loginMutation.isPending}
              {...form.register("password")}
            />

            <FieldError errors={[form.formState.errors.password]} />
          </FieldContent>
        </Field>

        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </AuthCard>
  );
}
