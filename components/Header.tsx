import React from "react";
import { titleDogpatch, titleFavorites, linkFavorites } from "../lib/defaults";
import Button from "./Button";

type PropType = {
  isFavorites?: boolean;
  titleGray?: boolean;
  addClass?: string;
  buttonColor?: string;
};

const Header: React.FC<PropType> = ({
  isFavorites,
  titleGray,
  addClass,
  buttonColor,
}) => {
  return (
    <header className={`bg-white p-6 ${addClass}`}>
      <nav className="flex items-center justify-between" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="">
            <h1
              className={`text-2xl font-bold leading-7 ${
                titleGray ? "text-gray-500" : "text-gray-900"
              } sm:truncate sm:text-3xl sm:tracking-tight`}
            >
              {titleDogpatch}
            </h1>
          </a>
        </div>
        <div className=" flex lg:justify-end items-center justify-between">
          <div className=" lg:flex">
            <a
              href={linkFavorites}
              className={`text-md font-semibold mr-16 leading-6 text-gray-900 hover:bg-gray-100 p-2 rounded-md ${
                isFavorites && "underline"
              }`}
            >
              {titleFavorites}
            </a>
          </div>
          <div className="lg:flex lg:flex-1">
            <div className="flex">
              <Button title="Sign up" color={buttonColor} link="/signup" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
