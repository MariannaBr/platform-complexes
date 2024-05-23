import React, { useState, useEffect } from "react";
import Router from "next/router";
import Image from "next/image";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { getLocalStorageFavorites, getIsFavorite } from "../lib/functions";
import { ApartmentProps } from "../components/Apartment";
import UnitCount from "./UnitCount";
import { getSortedApartments } from "../lib/functions";

export type ComplexProps = {
  id: string;
  title: string;
  metaTitle: string;
  slug: string;
  street: string;
  postal: string;
  description: string;
  metaDescription: string;
  link: string;
  image: string;
  rating: string;
  rateCount: number;
  placeId: string;
  coordinates: [];
  communityMap: string;
  amenitiesImgs: string[];
  amenities: string[];
  apartmentAmenitiesImgs: string[];
  apartmentAmenities: string[];
  neighborhoodImgs: string[];
  neighborhood: string[];
  roofDeck: boolean;
  bbq: boolean;
  gym: boolean;
  pool: boolean;
  workSpaces: boolean;
  gameRoom: boolean;
  packing: boolean;
  bikeStorage: boolean;
  petFriendly: boolean;
  garage: boolean;
  evCharging: boolean;
  hardFloors: boolean;
  inUnitWasher: boolean;
  bigWindows: boolean;
  airCondition: boolean;
  balconies: boolean;
  modernStyle: boolean;
  furnishedOpt: boolean;
  walkInCloset: boolean;
  storage: boolean;
  inclEnergies: boolean;
  apartments: ApartmentProps[];
};

const Complex: React.FC<{
  complex: ComplexProps;
  isFavoritesPage?: boolean;
}> = ({ complex, isFavoritesPage }) => {
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(
    getIsFavorite(complex.id)
  );
  const [icon, setIcon] = useState<IconDefinition>(faHeartReg);
  const [sortedApartments, setSortedApartments] = useState<ApartmentProps[]>(
    []
  );
  useEffect(() => {
    setIcon(getIsFavorite(complex.id) ? faHeart : faHeartReg);
  }, []);
  const saveFavorite = () => {
    const savedComplexes = getLocalStorageFavorites();
    if (isFavorite) {
      const index = savedComplexes.indexOf(complex.id);
      if (index > -1) {
        savedComplexes.splice(index, 1);
        setFavorites(favorites);
        setIsFavorite(false);
      }
    } else {
      savedComplexes.push(complex.id);
      setFavorites(favorites);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(savedComplexes));
    setIcon(icon === faHeartReg ? faHeart : faHeartReg);
    isFavoritesPage && window.location.reload();
  };

  useEffect(() => {
    setSortedApartments(getSortedApartments(complex.apartments, "price"));
  }, []);

  return (
    <div>
      <div className="relative w-full">
        <a
          onClick={() => Router.push("/[slug]", `/${complex.slug}`)}
          href={`/${complex.slug}`}
          className="cursor-pointer relative"
        >
          <div className="relative w-full rounded-t-2xl bg-gray-100 object-cover aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2]">
            <Image
              src={complex.image}
              alt={complex.title}
              fill={true}
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={true}
              style={{ objectFit: "cover" }}
              className="rounded-t-2xl"
            />
            <button
              className="w-6 h-6 absolute right-4 top-4 text-pink-600 z-10"
              aria-label="save"
            >
              <FontAwesomeIcon
                icon={icon}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  saveFavorite();
                }}
              />
            </button>
          </div>
        </a>
      </div>
      <div className="group relative max-w-xl px-3 pb-3">
        <div className="mt-3 mx-1 flex items-center justify-between gap-x-4 text-xs">
          <a
            onClick={() => Router.push("/[slug]", `/${complex.slug}`)}
            href={`/${complex.slug}`}
            className="cursor-pointer relative"
          >
            <h2 className="text-lg font-semibold leading-6 text-gray-900">
              {complex.title}
            </h2>
          </a>
          <Rating
            placeId={complex.placeId}
            rating={complex.rating}
            rateCount={complex.rateCount}
          />
        </div>
        <a
          onClick={() => Router.push("/[slug]", `/${complex.slug}`)}
          href={`/${complex.slug}`}
          className="cursor-pointer relative"
        >
          <UnitCount count={sortedApartments.length} />
          <p className="mt-3 mx-1 line-clamp-3 text-left text-sm leading-6 text-gray-600">
            {complex.description}
          </p>
        </a>
      </div>
    </div>
  );
};

export default Complex;
