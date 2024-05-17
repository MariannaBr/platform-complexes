import React, { useState, useEffect } from "react";
import { neighborhoods } from "../lib/defaults";

const CallToActionPopup: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState("");

  // Check local storage to determine if the modal should be shown
  useEffect(() => {
    const isModalClosed = localStorage.getItem("isModalClosed");
    if (!isModalClosed) {
      setIsOpen(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const district = formData.get("options");

    try {
      const response = await fetch("/api/popup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, district }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      } else {
        handleClose();
      }
      event.target.reset();
    } catch (error) {
      console.error("Failed to submit form", error.message);
    }
  };

  // Close the modal
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("isModalClosed", "true");
  };

  return (
    <>
      {isOpen && (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 lg:p-14 rounded-lg shadow-lg max-w-sm md:max-w-xl lg:max-w-xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              ✕
            </button>
            <div className="flex justify-center">
              <img
                src="/favicon.png"
                className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-4"
                alt="logo"
              />
              <h2 className="mb-4 md:mb-8 text-center text-2xl md:text-3xl font-bold tracking-tight text-pink-600">
                Welcome!
              </h2>
            </div>
            <form
              className="mx-auto my-4 max-w-sm md:max-w-md lg:max-w-xl justify-center"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col mb-8 justify-center">
                <label
                  htmlFor="options"
                  className="text-sm md:text-lg font-medium text-gray-700 mb-4"
                >
                  Where in San Francisco do you want to live?
                </label>
                <select
                  id="options"
                  name="options"
                  className="min-w-0 rounded-md border-0 bg-gray-200 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset
            ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white text-xs md:text-sm sm:leading-6"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {neighborhoods.map((opt, index) => (
                    <option key={index} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 bg-gray-200 mr-8 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset
           ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white text-sm leading-6 placeholder-gray-500"
                  placeholder="Enter your email"
                />

                <button
                  type="submit"
                  className="flex rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
           hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CallToActionPopup;
