import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import AuthCard from "../components/AuthCard";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { useRegister } from "../api/auth.mutations";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    const submitData = { ...values };
    delete (submitData as Partial<RegisterFormValues>).confirmPassword;

    registerMutation.mutate(submitData, {
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
      title="Create Account"
      description="Create your account to continue"
      footer={
        <>
          <Separator />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Field invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>

          <FieldContent>
            <Input
              id="name"
              autoComplete="name"
              placeholder="Enter your full name"
              disabled={registerMutation.isPending}
              {...form.register("name")}
            />

            <FieldError errors={[form.formState.errors.name]} />
          </FieldContent>
        </Field>

        <Field invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>

          <FieldContent>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              disabled={registerMutation.isPending}
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
              autoComplete="new-password"
              placeholder="Enter your password"
              disabled={registerMutation.isPending}
              {...form.register("password")}
            />

            <FieldError errors={[form.formState.errors.password]} />
          </FieldContent>
        </Field>

        <Field invalid={!!form.formState.errors.confirmPassword}>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>

          <FieldContent>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              disabled={registerMutation.isPending}
              {...form.register("confirmPassword")}
            />

            <FieldError errors={[form.formState.errors.confirmPassword]} />
          </FieldContent>
        </Field>

        <Button
          type="submit"
          className="w-full"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending
            ? "Creating Account..."
            : "Create Account"}
        </Button>
      </form>
    </AuthCard>
  );
}
