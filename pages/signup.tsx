import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Devider from "../components/Devider";
import Footer from "../components/Footer";
import MetaData from "../components/MetaData";
import {
  metaTitleSignup,
  metaDescriptionSignup,
  metaLinkSignup,
  metaImageHome,
  domainDogpatch,
  domainMissionBay,
  locationDogpatch,
  locationMissionBay,
} from "../lib/defaults";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { req } = context;
  const host = req.headers.host;

  let location = "";

  // Check the domain and set location accordingly
  if (host === domainDogpatch) {
    location = locationDogpatch;
  } else if (host === domainMissionBay) {
    location = locationMissionBay;
  } else if (host === "localhost:3000") {
    location = locationMissionBay;
  }

  return {
    props: {
      location,
    },
  };
};

type Props = {
  location: string;
};

const SignupPage: React.FC<Props> = (props) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Handle success
      setIsSuccess(true);
      setFeedbackMessage("Thank you!");
      event.target.reset();
    } catch (error) {
      // Handle errors
      setIsSuccess(false);
      setFeedbackMessage(error.toString());
      console.error("Failed to submit form", error);
    }
  };
  return (
    <>
      <MetaData
        type="Signup"
        title={metaTitleSignup}
        description={metaDescriptionSignup}
        image={metaImageHome}
        url={metaLinkSignup}
      />
      <Layout>
        <Header isHomepage={true} location={props.location} />
        <Devider />
        <div className="bg-white -my-6 sm:my-24">
          <div className="mx-auto max-w-2xl xl:max-w-7xl">
            <div className="relative isolate overflow-hidden py-24 sm:rounded-3xl sm:px-24 xl:py-32">
              <h2 className="mx-auto mb-8 max-w-2xl text-center text-3xl font-bold tracking-tight text-black sm:text-4xl">
                We appreciate your interest. Thank you!
              </h2>
              <p className="mx-2 sm:mx-auto mb-20 max-w-xl text-center text-lg leading-8 text-gray-800">
                Leave us a message and we will get to you as fast as possible!
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
                  className="sm:mx-auto mx-2 my-4 max-w-xl gap-x-4"
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
                    className="flex-auto w-full rounded-md border-0 bg-gray-200 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset
                 ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white text-sm leading-6 placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                  <label htmlFor="message" className="sr-only">
                    Your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full rounded-md border-0 bg-gray-200 px-3.5 py-2 mt-6 text-gray-800 shadow-sm ring-1 ring-inset
                 ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white text-sm leading-6 placeholder-gray-500"
                    placeholder="Type your message"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-pink-600 px-3.5 py-2.5 mt-4 text-sm font-semibold text-white shadow-sm
                 hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-white"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default SignupPage;
