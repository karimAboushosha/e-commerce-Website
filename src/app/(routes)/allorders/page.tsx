import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmationPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-2xl text-center">
        <CheckCircle2 className="mx-auto text-green-600 w-16 h-16 mb-4" />
        <h2 className="text-blue-900 text-3xl font-extrabold mb-3">
          Congratulations!
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Your order has been set up and will be prepared shortly.
        </p>
        <h3 className="text-blue-500 text-xl font-bold">
          Thank you for shopping with us!
        </h3>
      </div>
    </div>
  );
}
