import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PropType = {
  count: number;
  units?: string;
};

const UnitCount: React.FC<PropType> = ({ count, units = "Units" }) => {
  const OPTIONS: EmblaOptionsType = { loop: false, slidesToScroll: "auto" };

  return (
    <div className="flex items-baseline mx-1 mt-2">
      <div className="w-3 h-3">
        <FontAwesomeIcon icon={faBuilding} className="text-pink-500" />
      </div>
      <div className="text-sm text-gray-600 pl-2">
        {count} {units}
      </div>
    </div>
  );
};

export default UnitCount;
