import React from "react";
import Button from "./Button";
import { titleDogpatch, titleFavorites, linkFavorites } from "../lib/defaults";

const Navigation: React.FC = () => {
  return (
    <nav className="py-4 max-w-7xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        <a
          href="/"
          className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-xs font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <svg className="w-3 h-3 mr-2" viewBox="0 0 532 532">
            <path
              fill="currentColor"
              d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
            />
          </svg>
          {titleDogpatch}
        </a>
        <div className="mt-4 flex md:ml-6 md:mt-0 shadow-sm">
          <Button title={titleFavorites} color="pink" link={linkFavorites} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
