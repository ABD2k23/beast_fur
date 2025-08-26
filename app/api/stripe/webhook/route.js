// app/api/stripe/webhook/route.js
import { NextResponse } from "next/server"; // Import NextResponse for App Router
import { supabaseAdmin } from "@/lib/supabaseClient"; // Corrected import path for supabaseAdmin
import Stripe from "stripe";
import { buffer } from "micro"; // Make sure you've installed 'micro': npm install micro

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // Use a recent API version
});

// IMPORTANT: Disable body parsing for this route
// Stripe sends a raw body for signature verification.
export const config = {
  api: {
    bodyParser: false,
  },
};

// This function will handle POST requests to /api/stripe/webhook
export async function POST(req) {
  // Use req.headers.get() for App Router
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Read the raw request body using 'micro' buffer
    const buf = await buffer(req);
    // Verify the webhook signature to ensure the event is from Stripe
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error(`⚠️ Webhook Error: ${err.message}`);
    // Return a 400 response for invalid signatures
    return NextResponse.json(
      { message: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("Stripe Checkout Session Completed:", session.id);

      // Retrieve your booking ID that was passed as client_reference_id
      const bookingId = session.client_reference_id;
      const paymentStatus = session.payment_status;

      if (bookingId && paymentStatus === "paid") {
        try {
          // Update the booking status in Supabase
          const { error: updateError } = await supabaseAdmin
            .from("bookings")
            .update({ status: "confirmed" })
            .eq("id", bookingId);

          if (updateError) {
            console.error("Error updating booking status:", updateError);
            // Even if update fails, we respond 200 to Stripe to avoid retries
            return NextResponse.json(
              { received: true, message: "Failed to update booking status." },
              { status: 500 }
            );
          }
          console.log(`Booking ${bookingId} confirmed successfully.`);
        } catch (error) {
          console.error(
            "Error processing checkout.session.completed event:",
            error
          );
          return NextResponse.json(
            {
              received: true,
              message: "Internal server error during booking update.",
            },
            { status: 500 }
          );
        }
      } else {
        console.warn(
          "Received checkout.session.completed event but bookingId is missing or payment_status is not 'paid'."
        );
      }
      break;

    // You can handle other Stripe events here if needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  // Stripe requires a 200 OK response to mark the webhook as successful.
  return NextResponse.json({ received: true }, { status: 200 });
}
