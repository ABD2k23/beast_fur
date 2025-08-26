"use client";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Load Stripe.js with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// VisitorInfo Component
const VisitorInfo = ({ index, visitorData, onVisitorDataChange }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    onVisitorDataChange(index, { ...visitorData, [id]: value });
  };

  return (
    <div className="mb-8 w-full">
      <div className="flex items-center mb-6 w-full">
        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
        <h6>Visitor Information - {index + 1}</h6>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label
            htmlFor={`fullName-${index}`}
            className="block mb-3 text-black-70"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full p-3 rounded border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
            placeholder="Haider Ali"
            value={visitorData.fullName || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor={`age-${index}`} className="block mb-3 text-black-70">
            Age
          </label>
          <input
            type="text"
            id="age"
            className="w-full p-3 rounded border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
            placeholder="10, 15, 40"
            value={visitorData.age || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor={`anyAllergies-${index}`}
            className="block mb-3 text-black-70"
          >
            Any Allergies
          </label>
          <input
            type="text"
            id="anyAllergies"
            className="w-full p-3 rounded border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
            placeholder="Asthma etc"
            value={visitorData.anyAllergies || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor={`accessibilityNeeds-${index}`}
            className="block mb-3 text-black-70"
          >
            Accessibility Needs
          </label>
          <input
            type="text"
            id="accessibilityNeeds"
            className="w-full p-3 rounded border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
            placeholder="Wheelchair etc."
            value={visitorData.accessibilityNeeds || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

const DetailsContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get plan details from URL
  const planId = searchParams.get("plan");
  const planName = searchParams.get("name");
  const planPrice = parseFloat(searchParams.get("price")) || 0;
  const planDuration = searchParams.get("duration");

  // Form states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [dateOfVisit, setDateOfVisit] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numVisitors, setNumVisitors] = useState(1);
  const [visitorsData, setVisitorsData] = useState([{}]);

  // Calculate total price
  const totalPrice = numVisitors * planPrice;

  // Redirect to plan selection if no plan is chosen
  useEffect(() => {
    if (!planId) {
      router.push("/choose-plan");
    }
  }, [planId, router]);

  // Sync visitorsData with numVisitors
  useEffect(() => {
    if (numVisitors < visitorsData.length) {
      setVisitorsData(visitorsData.slice(0, numVisitors));
    } else if (numVisitors > visitorsData.length) {
      setVisitorsData([
        ...visitorsData,
        ...Array(numVisitors - visitorsData.length).fill({}),
      ]);
    }
  }, [numVisitors, visitorsData.length]);

  // Handle visitor count change
  const handleNumVisitorsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumVisitors(isNaN(value) || value < 1 ? 1 : value > 15 ? 15 : value);
  };

  // Update individual visitor data
  const handleVisitorDataChange = (index, data) => {
    setVisitorsData((prev) => {
      const newData = [...prev];
      newData[index] = data;
      return newData;
    });
  };

  // Process payment
  const handleProceedToPayment = async () => {
    setError(null);
    setLoading(true);

    // Validation checks
    if (!phoneNumber || !emailAddress || !dateOfVisit || !planId) {
      setError("Fill all required fields and select a plan.");
      setLoading(false);
      return;
    }

    // Validate visitor data
    const areVisitorsValid = visitorsData.every(
      (visitor) => visitor.fullName && visitor.age
    );
    if (!areVisitorsValid) {
      setError("Provide full name and age for all visitors.");
      setLoading(false);
      return;
    }

    try {
      // Send booking data to API route
      const response = await axios.post("/api/create-booking", {
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

      if (response.data.checkoutUrl) {
        const stripe = await stripePromise;
        if (stripe) {
          // Redirect to Stripe Checkout
          router.push(response.data.checkoutUrl);
        } else {
          setError("Payment gateway not loaded.");
        }
      } else {
        setError("Failed to generate payment link.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!planId) return <div>Redirecting...</div>;

  return (
    <div className="bg-white flex flex-col items-center w-full">
      <Nav st1={true} st2={true} st3={false} />

      <div className="w-full py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-10">
        <div className="w-full flex justify-between items-center mb-8">
          <h2>Details</h2>
          <div className="text-right">
            <p className="text-sm text-gray-600">Selected Plan</p>
            <h4>{planName}</h4>
            <p className="text-sm text-gray-600">{planDuration}</p>
          </div>
        </div>

        {/* Basic Info Section */}
        <div className="w-full mb-10">
          <div className="flex items-center mb-6">
            <span className="w-3 h-3 bg-[#343F36] rounded-full mr-3"></span>
            <h6 className="text-2xl font-semibold text-[#343F36]">
              Basic Information
            </h6>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label htmlFor="phoneNumber" className="block mb-3 text-black-70">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="w-full p-3 rounded border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
                placeholder="33333333333"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="emailAddress"
                className="block mb-3 text-black-70"
              >
                Email Address
              </label>
              <input
                type="email"
                id="emailAddress"
                className="w-full p-3 rounded border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
                placeholder="Haider@example.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="noOfVisitors"
                className="block mb-3 text-black-70"
              >
                No. of Visitors
              </label>
              <select
                id="noOfVisitors"
                className="w-full p-3 rounded border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
                value={numVisitors}
                onChange={handleNumVisitorsChange}
                required
              >
                {[...Array(15)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dateOfVisit" className="block mb-3 text-black-70">
                Date of Visit
              </label>
              <input
                type="date"
                id="dateOfVisit"
                className="w-full p-3 rounded border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
                value={dateOfVisit}
                onChange={(e) => setDateOfVisit(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>
        </div>

        {/* Visitor Information Sections */}
        {Array.from({ length: numVisitors }).map((_, index) => (
          <VisitorInfo
            key={index}
            index={index}
            visitorData={visitorsData[index] || {}}
            onVisitorDataChange={handleVisitorDataChange}
          />
        ))}

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Price Summary & Payment Button */}
        <div className="w-full flex justify-between items-center border-t pt-8 mt-8">
          <div>
            <p className="text-sm text-gray-600">
              {planName} - ${planPrice} per person × {numVisitors} visitor
              {numVisitors > 1 ? "s" : ""}
            </p>
            <h4 className="text-2xl font-bold text-[#343F36]">${totalPrice}</h4>
          </div>
          <button
            onClick={handleProceedToPayment}
            className="bg-[#343F36] text-white px-8 py-3 rounded-xl shadow-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay $${totalPrice}`}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsContent />
    </Suspense>
  );
};

export default App;
