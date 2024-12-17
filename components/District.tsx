import React from "react";
import { ComplexProps } from "./Complex";
import UnitCount from "./UnitCount";

export type DistrictProps = {
  id: string;
  title: string;
  link: string;
  image: string;
  complexes: ComplexProps[];
};

const District: React.FC<{
  district: DistrictProps;
}> = ({ district }) => {
  return (
    <div>
      <div className="relative w-full">
        <a href={`/${district.link}`} className="cursor-pointer relative">
          <div className="relative w-full rounded-t-2xl bg-gray-100 object-cover aspect-video">
            <img
              src={district.image}
              className="rounded-t-2xl object-cover h-full w-full"
            />
          </div>
        </a>
      </div>
      <div className="group relative px-3 pb-3">
        <div className="mt-3 mx-1 flex items-center justify-between gap-x-4 text-xs">
          <a href={`/${district.link}`} className="cursor-pointer relative">
            <h2 className="text-lg font-semibold leading-6 text-gray-900">
              {district.title}
            </h2>
          </a>
        </div>

        <div className="mt-3 mx-1 flex items-center justify-between text-xs">
          <UnitCount count={district.complexes.length} units="Complexes" />
        </div>
        <a href={`/${district.link}`} className="cursor-pointer relative"></a>
      </div>
    </div>
  );
};

export default District;
