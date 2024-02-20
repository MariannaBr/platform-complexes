import React from "react";
import Router from "next/router";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";

export type ComplexProps = {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  rating: string;
  placeId: string;
  coordinates: [];
  communityMap: string;
  amenitiesImgs: string[];
  amenities: string[];
  apartmentAmenitiesImgs: string[];
  apartmentAmenities: string[];
  neighborhoodImgs: string[];
  neighborhood: string[];
};

const Complex: React.FC<{ complex: ComplexProps }> = ({ complex }) => {
  return (
    <button
      onClick={() => Router.push("/p/[id]", `/p/${complex.id}`)}
      className=""
    >
      <div className="relative w-full">
        <img
          src={complex.image}
          alt=""
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        <FontAwesomeIcon
          icon={faHeartReg}
          className="w-6 h-6 absolute right-4 top-4 text-pink-600"
        />
        {/* <FontAwesomeIcon
          icon={faHeart}
          className="w-6 h-6 absolute right-4 top-4 text-indigo-600"
        /> */}
      </div>
      <div className="max-w-xl">
        <div className="group relative">
          <div className="mt-3 mx-1 flex items-center justify-between gap-x-4 text-xs">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              {complex.title}
            </h3>
            <Rating placeId={complex.placeId} rating={complex.rating} />
          </div>
          <p className="mt-2 mx-1 line-clamp-2 text-left text-sm leading-6 text-gray-600">
            {complex.description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default Complex;
