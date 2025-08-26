// pages/booking-confirmation.js
"use client";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BookingConfirmation = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const status = searchParams.get("status"); // 'cancelled' or not present for success
  const [message, setMessage] = useState("Processing your booking...");

  useEffect(() => {
    if (status === "cancelled") {
      setMessage(
        "Your booking was cancelled. You can try again or choose a different tour."
      );
    } else if (sessionId) {
      // In a real application, you might fetch more details from your backend
      // using the sessionId to confirm the booking was updated by the webhook.
      setMessage(
        "Congratulations! Your booking has been confirmed and payment was successful. A confirmation email will be sent shortly."
      );
    } else {
      setMessage(
        "Something went wrong with your booking. Please contact support."
      );
    }
  }, [sessionId, status]);

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <Nav st1={true} st2={true} st3={true} />{" "}
      {/* Assuming '3' is for confirmation step */}
      <div className="flex flex-col items-center justify-center flex-grow p-10 text-center">
        {status === "cancelled" ? (
          <h4 className="text-red-600 mb-4">Cancelled</h4>
        ) : (
          <h4 className="text-green-600 mb-4">Success</h4>
        )}
        <p className="sm !leading-[1.6] w-full max-w-[450]">{message}</p>
        <button
          className="mt-[60]"
          onClick={() => (window.location.href = "/")} // Redirects to homepage
        >
          Go to Homepage
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
