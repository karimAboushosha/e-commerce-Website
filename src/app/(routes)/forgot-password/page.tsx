"use client";
import React, { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import Router from "next/router";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
    const router = useRouter();
  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email,
      });
      setMessage("✅ Reset code sent! Please check your email.");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "❌ Something went wrong.");
    }
  }

  return (
    <div className="mx-auto w-1/2 my-10">
      <h2 className="font-bold text-3xl tracking-tighter my-5">Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <Input
          type="email"
          placeholder="Enter your email"
          className="p-5 m-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="py-5 cursor-pointer mt-3">
          Send Reset Code
        </Button>
      </form>
      
      {message && (
  <p className="mt-3 text-blue-700">
    {message}{" "}
    <span
      onClick={() => router.push("/verify-code")}
      className="text-blue-600 cursor-pointer hover:underline font-bold underline"
    >
      Enter Code
    </span>
  </p>
)}

    </div>
  );
}
