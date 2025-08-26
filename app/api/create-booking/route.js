// app/api/create-booking/route.js
// This file handles POST requests to /api/create-booking

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient"; // Ensure this path is correct
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // Specify a recent Stripe API version
});

/**
 * Handles POST requests for creating a new booking and initiating a Stripe Checkout session.
 * @param {Request} req The incoming Next.js Request object.
 * @returns {NextResponse} A JSON response with the Stripe Checkout URL or an error.
 */
export async function POST(req) {
  try {
    const {
      planId, // This is currently 'explorer', 'adventure', etc. (the plan name/slug)
      planName,
      planPrice,
      phoneNumber,
      emailAddress,
      dateOfVisit,
      numVisitors,
      visitorsData,
      totalPrice,
    } = await req.json();

    if (
      !planId ||
      !planName ||
      planPrice === undefined ||
      !phoneNumber ||
      !emailAddress ||
      !dateOfVisit ||
      numVisitors === undefined ||
      !visitorsData ||
      totalPrice === undefined
    ) {
      console.error("Missing required booking data:", {
        planId,
        planName,
        planPrice,
        phoneNumber,
        emailAddress,
        dateOfVisit,
        numVisitors,
        visitorsData,
        totalPrice,
      });
      return NextResponse.json(
        { message: "Missing required booking data." },
        { status: 400 }
      );
    }

    // --- NEW STEP: Fetch the actual tour_id (UUID) from the 'tours' table ---
    // Assuming 'planId' from the frontend is actually the 'name' or a unique 'slug' of the tour in your 'tours' table
    const { data: tourData, error: tourError } = await supabaseAdmin
      .from("tours")
      .select("id") // Select only the 'id' (UUID)
      .eq("name", planName) // Use planName to find the tour. If you have a 'slug' column, use .eq("slug", planId)
      .single();

    if (tourError || !tourData) {
      console.error("Error fetching tour ID or tour not found:", tourError);
      return NextResponse.json(
        { message: "Selected tour not found or invalid." },
        { status: 404 }
      );
    }

    const actualTourId = tourData.id; // This is the UUID for the tour

    // --- Step 1: Insert the pending booking into Supabase ---
    const { data: booking, error: insertError } = await supabaseAdmin
      .from("bookings")
      .insert({
        tour_id: actualTourId, // Use the fetched UUID here!
        customer_phone: phoneNumber,
        customer_email: emailAddress,
        date_of_visit: dateOfVisit,
        number_of_visitors: numVisitors,
        visitors_data: visitorsData,
        total_price: totalPrice,
        status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Supabase insert error for booking:", insertError);
      return NextResponse.json(
        { message: "Failed to create pending booking in database." },
        { status: 500 }
      );
    }

    const bookingId = booking.id;

    // --- Step 2: Create a Stripe Checkout Session ---
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${planName} Tour`,
              description: `Booking for ${numVisitors} visitors on ${dateOfVisit}`,
            },
            unit_amount: Math.round(totalPrice * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking-confirmation?status=cancelled`,
      client_reference_id: bookingId,
      customer_email: emailAddress,
    });

    // --- Step 3: Update the Supabase booking with the Stripe Checkout Session ID ---
    const { error: updateError } = await supabaseAdmin
      .from("bookings")
      .update({
        stripe_checkout_session_id: session.id,
      })
      .eq("id", bookingId);

    if (updateError) {
      console.error("Supabase update error (linking Stripe ID):", updateError);
    }

    return NextResponse.json({ checkoutUrl: session.url }, { status: 200 });
  } catch (error) {
    console.error("Error in create-booking API route:", error);
    return NextResponse.json(
      { message: "An internal server error occurred.", error: error.message },
      { status: 500 }
    );
  }
}
