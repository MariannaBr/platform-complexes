import React from "react";
import Button from "./Button";
import { titleFavorites, titleHome, linkFavorites } from "../lib/defaults";

type PropType = {
  title: string;
  placeId?: string;
  rating?: string;
  rateCount?: number;
  isHomepage: boolean;
  addClass?: string;
};

const Header: React.FC<PropType> = ({ title, isHomepage, addClass }) => {
  const buttonTitle = isHomepage ? titleFavorites : titleHome;
  const link = isHomepage ? linkFavorites : "/";
  return (
    <nav className="p-6">
      <div className={`md:flex md:items-center md:justify-between ${addClass}`}>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h1>
        <div className="mt-4 flex md:ml-6 md:mt-0">
          <Button title={buttonTitle} color="pink" link={link} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
