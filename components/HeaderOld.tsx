import React from "react";
import {
  titleDogpatch,
  titleFavorites,
  linkFavorites,
  titleSignup,
  linkSignup,
  titleTable,
  linkTable,
} from "../lib/defaults";
import Button from "./Button";

type PropType = {
  isFavorites?: boolean;
  titleGray?: boolean;
  addClass?: string;
};

const Header: React.FC<PropType> = ({ isFavorites, titleGray, addClass }) => {
  return (
    <header className={`bg-white py-6 px-6 ${addClass}`}>
      <nav
        className="lg:flex lg:items-center lg:justify-between"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="">
            <h1
              className={`text-lg md:text-2xl font-bold leading-7 ${
                titleGray ? "text-gray-500" : "text-gray-900"
              }`}
            >
              {titleDogpatch}
            </h1>
          </a>
        </div>
        <div className="mt-3 lg:mt-0 flex lg:justify-end items-center justify-between gap-x-4">
          <div className=" lg:flex">
            <Button
              title={titleTable}
              link={linkTable}
              label={titleTable}
              buttonColor={
                isFavorites
                  ? "button_colors_gray_underline"
                  : "button_colors_gray"
              }
            />
          </div>
          <div className=" lg:flex">
            <Button
              title={titleFavorites}
              link={linkFavorites}
              label={titleFavorites}
              buttonColor={
                isFavorites
                  ? "button_colors_gray_underline"
                  : "button_colors_gray"
              }
            />
          </div>
          <div className="lg:flex lg:flex-1">
            <Button
              title={titleSignup}
              buttonColor="button_colors_pink"
              link={linkSignup}
              label={titleSignup}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
