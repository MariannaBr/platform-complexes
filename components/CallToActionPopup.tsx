import React, { useState, useEffect, Fragment } from "react";
import { neighborhoods } from "../lib/defaults";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  onSubmit: () => void;
};
const CallToActionPopup: React.FC<Props> = ({ onSubmit }) => {
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
    const district = formData.get("location");
    const message = formData.get("message");

    try {
      const response = await fetch("/api/popup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, district, message }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      } else {
        handleClose();
        onSubmit();
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
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm md:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={handleClose}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
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
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm md:text-lg font-medium text-gray-700 mb-3"
                      >
                        Where in San Francisco do you want to live?
                      </label>
                      <select
                        id="location"
                        name="location"
                        className="mb-8 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-700 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-400 text-sm leading-6"
                        defaultValue=""
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 text-sm leading-6"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="sr-only">
                        Your message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={2}
                        className="w-full rounded-md border-0 px-3.5 py-2 mt-8 text-gray-900 shadow-sm ring-1 ring-inset
                 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-400 text-sm leading-6 placeholder:text-gray-400"
                        placeholder="Type your message if you want"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex rounded-md bg-pink-600 px-3.5 py-2.5 mt-4 text-sm font-semibold text-white shadow-sm
           hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-white"
                    >
                      Submit
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default CallToActionPopup;
