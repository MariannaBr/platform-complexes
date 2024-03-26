import React from "react";
import { ComplexProps } from "../components/Complex";

export type ApartmentProps = {
  id: string;
  complexId: string;
  beds: string;
  baths: string;
  area: string;
  price: string;
  image: string;
  link: string;
  complex: ComplexProps;
};

const Apartment: React.FC<{
  apartment: ApartmentProps;
  complexTitle: string;
  isFavorite?: boolean;
}> = ({ apartment, complexTitle, isFavorite }) => {
  return (
    <div className=" border rounded-2xl py-4">
      <div className="relative w-full">
        <a
          href={apartment.link}
          target="_blank"
          className="cursor-pointer relative rounded-2xl"
        >
          <div className="relative w-full rounded-2xl embla__slide__apartment">
            <img
              className="rounded-2xl"
              src={apartment.image}
              alt={`${apartment.beds} ${apartment.baths} "apartment"`}
            />
          </div>
        </a>
      </div>

      <a href={apartment.link} className="cursor-pointer" target="_blank">
        {isFavorite ? (
          <div className="flex gap-y-4">
            <div className="text-base leading-6 text-gray-900">
              {`${apartment.beds} | ${apartment.baths} | ${apartment.area}`}
            </div>
          </div>
        ) : (
          <div className="text-base font-semibold leading-6 text-gray-900 flex justify-around mt-4">
            <div className="">
              {`${apartment.beds} | ${apartment.baths} | ${apartment.area}`}
            </div>
            <div className="">{`From ${apartment.price}`}</div>
          </div>
        )}
      </a>
    </div>
  );
};

export default Apartment;
