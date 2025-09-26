"use client";
import React, { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function VerifyCodePage() {
  const [resetCode, setResetCode] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          resetCode,
        }
      );
      setMessage("✅ Code verified! You can now reset your password.");
      router.push("/reset-password"); // redirect to reset page
    } catch (error: any) {
      setMessage(error.response?.data?.message || "❌ Invalid reset code.");
    }
  }

  return (
    <div className="mx-auto w-1/2 my-10">
      <h2 className="font-bold text-3xl tracking-tighter my-5">
        Verify Reset Code
      </h2>
      <form onSubmit={handleVerifyCode}>
        <Input
          type="text"
          placeholder="Enter reset code"
          className="p-5 m-2"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          required
        />
        <Button type="submit" className="py-5 cursor-pointer mt-3">
          Verify Code
        </Button>
      </form>
      {message && <p className="mt-3 text-blue-700">{message}</p>}
      <p
        onClick={() => router.push("/forgot-password")}
        className="text-blue-600 mt-3 cursor-pointer hover:underline"
      >
        Didn’t get a code? Try again
      </p>
    </div>
  );
}
