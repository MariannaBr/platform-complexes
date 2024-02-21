import React from "react";
import Rating from "./Rating";
import ButtonIcon from "./ButtonIcon";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { titleSave } from "../lib/defaults";

type PropType = {
  title: string;
  placeId?: string;
  rating?: string;
  rateCount?: number;
  isHomepage: boolean;
};

const HeaderComplex: React.FC<PropType> = ({
  title,
  placeId,
  rating,
  rateCount,
  isHomepage,
}) => {
  return (
    <nav className="py-6 max-w-7xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-x-4 text-xs">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h1>
          <Rating placeId={placeId} rating={rating} rateCount={rateCount} />
        </div>
        <div className="flex">
          {!isHomepage && (
            <ButtonIcon iconName={faHeartReg} color="gray" title={titleSave} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default HeaderComplex;
