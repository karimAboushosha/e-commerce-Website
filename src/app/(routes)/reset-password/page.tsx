"use client";
import React, { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    try {
      await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email,
          newPassword,
        }
      );
      setMessage("✅ Password reset successfully! Please log in.");
      router.push("/login");
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "❌ Failed to reset password."
      );
    }
  }

  return (
    <div className="mx-auto w-1/2 my-10">
      <h2 className="font-bold text-3xl tracking-tighter my-5">
        Reset Password
      </h2>
      <form onSubmit={handleResetPassword}>
        <Input
          type="email"
          placeholder="Enter your email"
          className="p-5 m-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Enter new password"
          className="p-5 m-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Button type="submit" className="py-5 cursor-pointer mt-3">
          Reset Password
        </Button>
      </form>
      {message && <p className="mt-3 text-blue-700">{message}</p>}
      {message && (
        <p className="mt-3 text-green-700">
          {message}{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Go to Login
          </span>
        </p>
      )}
    </div>
  );
}
