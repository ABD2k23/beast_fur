"use client";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe
import axios from "axios"; // Import axios for making API calls

// Make sure to load Stripe.js with your publishable key.
// This is a singleton, so you only load it once.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// VisitorInfo Component: Encapsulates the input fields for a single visitor.
const VisitorInfo = ({ index, visitorData, onVisitorDataChange }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    // Call the parent's handler to update this visitor's data
    onVisitorDataChange(index, { ...visitorData, [id]: value });
  };

  return (
    <div className="mb-[30] w-full">
      <div className="flex justify-start items-center mb-[45] w-full">
        <span className="w-[8] h-[8] bg-primary rounded-full mr-3"></span>
        <h6>Visitor Information - {index + 1}</h6>
      </div>
      <div className="!w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="w-full">
          <label
            htmlFor={`fullName-${index}`}
            className="block sm mb-3 !text-black-70"
          >
            Full Name
          </label>
          <input
            type="text"
            id={`fullName`}
            className="w-full p-[15] rounded-[8] border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
            placeholder="Haider Ali"
            value={visitorData.fullName || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full">
          <label
            htmlFor={`age-${index}`}
            className="block sm !text-black-70 mb-3"
          >
            Age
          </label>
          <input
            type="text"
            id={`age`}
            className="w-full p-[15] rounded-[8] border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
            placeholder="10, 15, 40"
            value={visitorData.age || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full">
          <label
            htmlFor={`anyAllergies-${index}`}
            className="block sm !text-black-70 mb-3"
          >
            Any Allergies
          </label>
          <input
            type="text"
            id={`anyAllergies`}
            className="w-full p-[15] rounded-[8] border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
            placeholder="Asthma etc"
            value={visitorData.anyAllergies || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor={`accessibilityNeeds-${index}`}
            className="block sm !text-black-70 mb-3"
          >
            Accessibility Needs
          </label>
          <input
            type="text"
            id={`accessibilityNeeds`}
            className="w-full p-[15] rounded-[8] border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
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

  // Get plan details from URL parameters
  const planId = searchParams.get("plan");
  const planName = searchParams.get("name");
  const planPrice = parseFloat(searchParams.get("price")) || 0;
  const planDuration = searchParams.get("duration");

  // State for basic information fields
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [dateOfVisit, setDateOfVisit] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error messages

  // Get today's date in YYYY-MM-DD format for the min attribute of the date picker
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // State for number of visitors and their individual data
  const [numVisitors, setNumVisitors] = useState(1);
  const [visitorsData, setVisitorsData] = useState([{}]);

  // Calculate total price
  const totalPrice = numVisitors * planPrice;

  // Redirect to choose plan if no plan is selected
  useEffect(() => {
    if (!planId) {
      router.push("/choose-plan");
    }
  }, [planId, router]);

  // Effect to adjust visitorsData array size when numVisitors changes
  useEffect(() => {
    if (numVisitors < visitorsData.length) {
      setVisitorsData((prevData) => prevData.slice(0, numVisitors));
    } else if (numVisitors > visitorsData.length) {
      setVisitorsData((prevData) => {
        const newVisitors = Array(numVisitors - prevData.length).fill({});
        return [...prevData, ...newVisitors];
      });
    }
  }, [numVisitors, visitorsData.length]); // Add visitorsData.length to dependency array

  // Handler for "No. of Visitors" input change
  const handleNumVisitorsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumVisitors(isNaN(value) || value < 1 ? 1 : value > 15 ? 15 : value);
  };

  // Handler for updating individual visitor data
  const handleVisitorDataChange = (index, data) => {
    setVisitorsData((prevData) => {
      const newVisitorsData = [...prevData];
      newVisitorsData[index] = data;
      return newVisitorsData;
    });
  };

  // Handle the "Proceed to payment" button click
  const handleProceedToPayment = async () => {
    setError(null); // Clear previous errors
    setLoading(true); // Set loading state

    // Basic client-side validation
    if (
      !phoneNumber ||
      !emailAddress ||
      !dateOfVisit ||
      numVisitors < 1 ||
      !planId ||
      !planName ||
      planPrice <= 0
    ) {
      setError(
        "Please fill in all required basic information and ensure a valid plan is selected."
      );
      setLoading(false);
      return;
    }

    // Validate visitor data: Ensure full name and age are provided for each visitor
    const areVisitorsDataValid = visitorsData.every(
      (visitor) => visitor.fullName && visitor.age
    );

    if (!areVisitorsDataValid) {
      setError(
        "Please ensure full name and age are provided for all visitors."
      );
      setLoading(false);
      return;
    }

    try {
      // Corrected API call path to match Next.js App Router structure
      const response = await axios.post("/api/create-booking", {
        planId, // This is your 'name' from the URL, like "Explorer"
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
        // Redirect to Stripe Checkout page
        const stripe = await stripePromise;
        if (stripe) {
          // *** FIX: Pass the entire checkoutUrl directly to redirectToCheckout ***
          router.push(response.data.checkoutUrl);
        } else {
          console.error("Stripe.js failed to load.");
          setError("Payment gateway not ready. Please try again.");
        }
      } else {
        setError("Failed to get Stripe checkout URL from backend.");
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      setError(
        err.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false); // End loading state
    }
  };

  if (!planId) {
    return <div>Redirecting to plan selection...</div>;
  }

  return (
    <div className="bg-white flex flex-col items-center w-full">
      <Nav st1={true} st2={true} st3={false} />

      {/* Main Content Area */}
      <div className="w-full py-[60] px-[15] sm:px-[30] lg:px-[60] flex justify-center items-start gap-[90] flex-col">
        <div className="w-full flex justify-between items-center">
          <h2>Details</h2>
          <div className="text-right max-lg:flex max-lg:gap-[8] max-lg:flex-col">
            <p className="text-sm text-gray-600">Selected Plan</p>
            <h4 className="text-[#343F36]">{planName}</h4>
            <p className="text-sm text-gray-600">{planDuration}</p>
          </div>
        </div>

        {/* Basic Information Section */}
        <div className="mb-10 w-full">
          {" "}
          {/* Added w-full */}
          <div className="flex items-center mb-6">
            <span className="w-3 h-3 bg-[#343F36] rounded-full mr-3"></span>
            <h6 className="text-2xl font-semibold text-[#343F36]">
              Basic Information
            </h6>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="phoneNumber"
                className="block sm !text-black-70 mb-3"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="w-full p-[15] rounded-[8] border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
                placeholder="33333333333"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="emailAddress"
                className="block sm !text-black-70 mb-3"
              >
                Email Address
              </label>
              <input
                type="email"
                id="emailAddress"
                className="w-full p-[15] rounded-[8] border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
                placeholder="Haider@example.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="noOfVisitors"
                className="block sm !text-black-70 mb-3"
              >
                No. of Visitors
              </label>
              <select
                id="noOfVisitors"
                className="w-full p-[15] rounded-[8] border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
                value={numVisitors}
                onChange={handleNumVisitorsChange}
                required
              >
                {[...Array(15).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="dateOfVisit"
                className="block sm !text-black-70 mb-3"
              >
                Date of Visit
              </label>
              <input
                type="date"
                id="dateOfVisit"
                className="w-full p-[15] rounded-[8] border border-black-20 focus:outline-none focus:ring-2 focus:ring-[#DD782F]"
                value={dateOfVisit}
                onChange={(e) => setDateOfVisit(e.target.value)}
                min={getTodayDate()}
                required
              />
            </div>
          </div>
        </div>

        {/* Dynamically rendered Visitor Information Sections */}
        {Array.from({ length: numVisitors }).map((_, index) => (
          <VisitorInfo
            key={index}
            index={index}
            visitorData={visitorsData[index] || {}}
            onVisitorDataChange={handleVisitorDataChange}
          />
        ))}

        {/* Error Message Display */}
        {error && (
          <div
            className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {/* Price Summary and Proceed to Payment Button */}
        <div className="w-full flex justify-between max-xs:flex-col max-xs:gap-[30] max-xs:items-start items-center border-t pt-8">
          <div className="flex flex-col">
            <div className="text-sm text-gray-600 mb-2">
              {planName} - ${planPrice} per person × {numVisitors} visitor
              {numVisitors > 1 ? "s" : ""}
            </div>
            <div className="text-2xl font-bold text-[#343F36]">
              Total: ${totalPrice}
            </div>
          </div>

          <button
            onClick={handleProceedToPayment}
            className="bg-[#343F36] text-white px-8 py-3 rounded-xl shadow-md hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Processing..." : `Proceed to payment - $${totalPrice}`}
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
