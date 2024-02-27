import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Devider from "../components/Devider";
import Footer from "../components/Footer";

const SignupPage: React.FC = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Handle success - maybe clear the form or show a success message
      setIsSuccess(true);
      setFeedbackMessage("Thank you for subscribing!");
      event.target.reset();
    } catch (error) {
      // Handle errors - show error message to the user
      setIsSuccess(false);
      setFeedbackMessage(error.toString());
      console.error("Failed to submit form", error);
    }
  };
  return (
    <Layout>
      <Header
        isFavorites={false}
        titleGray={false}
        addClass="max-w-7xl mx-auto xl:px-0"
        buttonColor="button_colors_gray_underline"
      />
      <Devider />
      <div className="bg-white -my-6 sm:my-24">
        <div className="mx-auto max-w-2xl xl:max-w-7xl">
          <div className="relative isolate overflow-hidden py-24 sm:rounded-3xl sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Thank you for your interest.
            </h2>
            <p className="mx-2 sm:mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-800">
              We are working on this feature. We will notify you as soon as we
              are ready.
            </p>

            {feedbackMessage ? (
              <div
                className={`mt-6 mx-2 text-center text-xl ${
                  isSuccess ? "text-pink-600" : "text-red-600"
                }`}
              >
                {feedbackMessage}
              </div>
            ) : (
              <form
                className="sm:mx-auto mx-2 my-4 flex max-w-md gap-x-4"
                onSubmit={handleSubmit}
              >
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 bg-gray-200 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset
                 ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 placeholder-gray-500"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
                 hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-white"
                >
                  Notify me
                </button>
              </form>
            )}
            {/* <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient
                  id="759c1415-0410-454c-8f7c-9a820de03641"
                  cx={0}
                  cy={0}
                  r={1}
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(512 512) rotate(90) scale(512)"
                >
                  <stop stopColor="#db2777" />
                  <stop offset={1} stopColor="#db2777" stopOpacity={0} />
                </radialGradient>
              </defs>
            </svg> */}
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
};

export default SignupPage;
