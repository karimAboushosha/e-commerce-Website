"use client";
import React, { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  interface Inputs {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(values: Inputs) {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.ok) {
        router.push("/");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="font-bold text-3xl tracking-tight text-gray-900 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mt-1 mb-6">
          Please log in to continue
        </p>

        {errorMessage && (
          <p className="text-red-600 text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Input
              type="email"
              placeholder="Email"
              className="p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              className="p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-white bg-green-600 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Login
          </Button>
        </form>

        <div className="flex justify-between items-center text-sm mt-5">
          <p
            onClick={() => router.push("/forgot-password")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Forgot password?
          </p>
          <p
            onClick={() => router.push("/register")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Create account
          </p>
        </div>
      </div>
    </div>
  );
}
