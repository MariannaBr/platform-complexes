import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mx-auto py-6 md:flex md:items-center md:justify-between lg:px-8">
      <div className="flex justify-center space-x-6 md:order-2">
        {/* {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))} */}
      </div>
      <div className="mt-8 md:order-1 md:mt-0">
        <p className="text-xs leading-5 text-gray-500">
          {/* &copy; 2020 Your Company, Inc. All rights reserved. */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
