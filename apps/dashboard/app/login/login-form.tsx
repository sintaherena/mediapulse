"use client";

import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormAction } from "./action/.generated/use-form-action";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { AuthCard, AuthLayout } from "@/components/auth-layout";

function LoginFormFields({
  errorMessage,
  pending,
}: {
  errorMessage: string | null;
  pending: boolean;
}) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="body.email" className="text-white font-medium">
          Email
        </Label>

        <Input
          id="body.email"
          name="body.email"
          type="email"
          required
          autoComplete="email"
          placeholder="m@example.com"
          className="h-11 rounded-xl border border-white text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#1169EE] focus-visible:border-[#1169EE] focus-visible:ring-offset-0 transition-all duration-200"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="body.password" className="text-white font-medium">
            Password
          </Label>

          <Link
            href="/forgot-password"
            className="text-sm cursor-pointer text-[#1169EE] hover:text-[#0D54BF] transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Input
          id="body.password"
          name="body.password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="******"
          className="h-11 rounded-xl border border-white text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#1169EE] focus-visible:border-[#1169EE] focus-visible:ring-offset-0 transition-all duration-200"
        />
      </div>
      {errorMessage && (
        <div className="text-sm font-medium text-red-600" role="alert">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full cursor-pointer h-11 rounded-xl bg-[#1169EE] hover:bg-[#0D54BF] text-white font-medium transition-all duration-200 shadow-md shadow-[#70A5F5]/30"
      >
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </>
  );
}

export function LoginForm() {
  const { FormWithAction, state, pending } = useFormAction();
  const { login } = useAuth();
  const router = useRouter();

  const { errorMessage, data } = useMemo(() => {
    if (!state) return { errorMessage: null, data: null };

    return {
      errorMessage: state.status === false ? state.message : null,
      data: state.status === true ? state.data : null,
    };
  }, [state]);

  useEffect(() => {
    if (data) {
      login({
        id: data.id,
        name: data.name,
        email: data.email,
      });
      router.push("/dashboard");
    }
  }, [data, login, router]);
  return (
    <AuthLayout>
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Sign in to your account
        </h1>
        <p className="text-sm text-gray-300">Continue where you left off.</p>
      </div>

      <AuthCard>
        <FormWithAction className="space-y-7">
          <LoginFormFields errorMessage={errorMessage} pending={pending} />
        </FormWithAction>

        <div className="text-center text-sm mt-5 text-gray-300">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium cursor-pointer text-[#1169EE] hover:text-[#0D54BF]"
          >
            Create one
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
