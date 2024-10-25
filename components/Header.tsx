import React from "react";
import {
  titleFavorites,
  linkFavorites,
  titleSignup,
  linkSignup,
  titleTableNav,
  linkTable,
} from "../lib/defaults";
import { usePathname } from "next/navigation";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: titleTableNav, href: linkTable },
  { name: titleFavorites, href: linkFavorites },
  { name: titleSignup, href: linkSignup },
];

type PropType = {
  addClass?: string;
  isHomepage?: boolean;
  title?: string;
};

const Header: React.FC<PropType> = ({ isHomepage, addClass, title }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={`bg-white py-4 px-2 lg:py-6 lg:px-6 ${addClass}`}>
      <nav
        className="mx-auto flex items-center justify-between"
        aria-label="Global"
      >
        <a href="/" className="flex">
          <img
            src="/favicon.png"
            className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-4"
            alt="logo"
          />
          {isHomepage ? (
            <h1 className="text-lg md:text-2xl font-bold leading-7 text-gray-900">
              {title}
            </h1>
          ) : (
            <h2 className="text-lg md:text-2xl font-bold leading-7 text-gray-900">
              {title}
            </h2>
          )}
        </a>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 text-gray-900 ${
                pathname === item.href && "underline"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-20" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
