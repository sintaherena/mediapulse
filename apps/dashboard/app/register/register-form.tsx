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

const useRegisterForm = () => {
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

  return { FormWithAction, pending, errorMessage };
};

function RegisterFields({
  pending,
  errorMessage,
}: {
  pending: boolean;
  errorMessage: string | null;
}) {
  return (
    <>
      <div className="space-y-2">
        <Label
          htmlFor="body.name"
          className="text-sm font-semibold text-white"
        >
          Full Name
        </Label>
        <Input
          id="body.name"
          name="body.name"
          type="text"
          placeholder="John Doe"
          required
          autoComplete="name"
          className="h-11 rounded-xl border border-white text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#1169EE] focus-visible:border-[#1169EE] focus-visible:ring-offset-0 transition-all duration-200"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="body.email"
          className="text-sm font-semibold text-white"
        >
          Email Address
        </Label>
        <Input
          id="body.email"
          name="body.email"
          type="email"
          placeholder="m@example.com"
          required
          autoComplete="email"
          className="h-11 rounded-xl border border-white text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#1169EE] focus-visible:border-[#1169EE] focus-visible:ring-offset-0 transition-all duration-200"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="body.password"
          className="text-sm font-semibold text-white"
        >
          Password
        </Label>
        <Input
          id="body.password"
          name="body.password"
          type="password"
          placeholder="Minimum 8 characters"
          required
          autoComplete="new-password"
          className="h-11 rounded-xl border border-white text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#1169EE] focus-visible:border-[#1169EE] focus-visible:ring-offset-0 transition-all duration-200"
        />
      </div>

      {errorMessage && (
        <div className="text-sm font-medium text-red-500" role="alert">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full h-11 cursor-pointer rounded-xl bg-[#1169EE] hover:bg-[#0D54BF] text-white font-medium transition-all duration-200 shadow-md shadow-[#70A5F5]/30"
      >
        {pending ? "Creating account..." : "Create account"}
      </Button>
    </>
  );
}

export function RegisterForm() {
  const { FormWithAction, pending, errorMessage } = useRegisterForm();

  return (
    <AuthLayout>
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Create your account
        </h1>
      </div>

      <AuthCard>
        <FormWithAction className="space-y-7">
          <RegisterFields pending={pending} errorMessage={errorMessage} />
        </FormWithAction>
        <div className="text-center text-sm mt-5 text-slate-300">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#1169EE] cursor-pointer hover:text-[#0A3F8F] transition-colors"
          >
            Sign in
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
