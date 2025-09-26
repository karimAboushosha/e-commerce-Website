"use client";
import React, { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  interface Inputs {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(values: Inputs) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (response?.data?.message === "success") {
        setErrorMessage(null);
        router.push("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg">
        <h2 className="font-bold text-3xl text-center text-black mb-6">
          Register
        </h2>

        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            className="p-5"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}

          <Input
            type="email"
            placeholder="Email Address"
            className="p-5"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}

          <Input
            type="password"
            placeholder="Password"
            className="p-5"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}

          <Input
            type="password"
            placeholder="Confirm Password"
            className="p-5"
            {...register("rePassword", {
              required: "Re-enter password is required",
            })}
          />
          {errors.rePassword && (
            <p className="text-red-600 text-sm">{errors.rePassword.message}</p>
          )}

          <Input
            type="tel"
            placeholder="Phone Number"
            className="p-5"
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm">{errors.phone.message}</p>
          )}

          <Button
            type="submit"
            className="w-full py-5 text-lg font-semibold bg-green-600 hover:bg-[#5aa911] text-white rounded-md"
          >
            Register
          </Button>
        </form>

        <p
          onClick={() => router.push("/login")}
          className="text-green-600 mt-5 text-center cursor-pointer hover:underline"
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
