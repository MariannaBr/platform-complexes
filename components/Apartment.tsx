import React from "react";
import { ComplexProps } from "../components/Complex";
import { noImageFoundUrl } from "../lib/defaults";

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
  complexTitle?: string;
};

const Apartment: React.FC<{
  apartment: ApartmentProps;
  complexTitle?: string;
  isFavorite?: boolean;
}> = ({ apartment, complexTitle, isFavorite }) => {
  const bedrooms = apartment.beds ? apartment.beds + " | " : "";
  const baths = apartment.baths ? apartment.baths + " | " : "";
  const area = apartment.area ?? "";
  const apartmentImage = apartment.image ?? noImageFoundUrl;
  const link = apartment.link ?? "";

  return (
    <div className=" border rounded-2xl py-4">
      <div className="relative w-full">
        <a
          href={link}
          target="_blank"
          className="cursor-pointer relative rounded-2xl"
        >
          <div className="relative w-full rounded-2xl">
            <img
              className="rounded-2xl embla__slide__img__apartment p-2"
              src={apartmentImage}
              alt={`${bedrooms} ${baths} "apartment"`}
            />
          </div>
        </a>
      </div>

      <a href={link} className="cursor-pointer" target="_blank">
        <div className="">
          <div className="text-base font-semibold leading-6 text-gray-900 flex justify-between mt-4 px-4">
            <div>
              {bedrooms} {baths} {area}
            </div>
            <div className="">{`From ${apartment.price}`}</div>
          </div>
          {isFavorite && (
            <div className="text-base leading-6 text-gray-500 px-4">
              {complexTitle}
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default Apartment;
