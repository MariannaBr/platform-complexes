import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CallToActionPopupSucess: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog className="relative z-10" onClose={onClose}>
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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="flex justify-center">
                      <img
                        src="/favicon.png"
                        className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-4"
                        alt="logo"
                      />
                      <h2 className="text-center text-2xl font-bold tracking-tight text-pink-600">
                        Success!
                      </h2>
                    </div>

                    <div className="text-center">
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 md:text-lg">
                          Thank you! You will be notify with updates.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-100 px-3 py-2 text-sm md:text-md font-semibold text-gray-600 shadow-sm hover:bg-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-200"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default CallToActionPopupSucess;
