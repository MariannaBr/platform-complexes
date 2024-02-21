import React from "react";
import Button from "./Button";
import { titleFavorites } from "../lib/defaults";

type PropType = {
  title: string;
  placeId?: string;
  rating?: string;
  rateCount?: number;
  isHomepage: boolean;
};

const HeaderHome: React.FC<PropType> = ({ title }) => {
  return (
    <nav className="p-6">
      <div className="md:flex md:items-center md:justify-between">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h1>
        <div className="mt-4 flex md:ml-6 md:mt-0">
          <Button title={titleFavorites} color="pink" />
        </div>
      </div>
    </nav>
  );
};

export default HeaderHome;
