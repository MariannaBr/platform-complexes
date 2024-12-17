import React, { useState } from "react";
import Complex from "./Complex";
import { ComplexProps } from "./Complex";
import CategoryTitle from "./CategoryTitle";
import { titleTopComplexesSF, titleDistrictsSF } from "../lib/defaults";
import District, { DistrictProps } from "./District";
import Footer from "./Footer";

const SFHomepage: React.FC<{
  complexes: ComplexProps[];
  districts: DistrictProps[];
}> = ({ complexes, districts }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 xl:px-0 text-justify">
      {complexes && (
        <>
          <CategoryTitle title={titleTopComplexesSF} />
          <div className="mx-auto w-full hide_scrollbar pb-6">
            <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-8 lg:gap-y-20 lg:mx-0 md:grid-cols-2 lg:grid-cols-5">
              {complexes?.map((complex) => (
                <div
                  key={complex.id}
                  className="flex flex-col items-start justify-between shadow-lg rounded-2xl"
                >
                  <Complex complex={complex} showDescription={false} />
                </div>
              ))}
            </div>
          </div>
          <CategoryTitle title={titleDistrictsSF} />
          <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-8 lg:gap-y-20 lg:mx-0 md:grid-cols-2 lg:grid-cols-3">
            {districts.map((district) => (
              <District district={district} />
            ))}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default SFHomepage;
