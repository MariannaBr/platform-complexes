import React from "react";
import UnitCount from "./UnitCount";

type PropType = {
  title: string;
  unitCount?: number;
};

const CategoryTitle: React.FC<PropType> = ({ title, unitCount }) => {
  return (
    <div className="md:flex mt-10 mb-6 items-baseline">
      <h3 className={`text-xl font-semibold ${unitCount && "mr-4"}`}>
        {title}
      </h3>
      {title === "Apartments" && (
        <div className="flex items-center text-sm text-gray-500 mr-4">
          The Apartments are not updated anymore. Please check the current
          availability on the community website. Thank you for understanding.
        </div>
      )}
      {unitCount && <UnitCount count={unitCount} />}
    </div>
  );
};

export default CategoryTitle;
