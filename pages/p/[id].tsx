import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { ComplexProps } from "../../components/Complex";
import prisma from "../../lib/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import Carousel from "../../components/Carousel";
import { EmblaOptionsType } from "embla-carousel";
import ListAmenities from "../../components/ListAmenities";
import Footer from "../../components/Footer";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const complex = await prisma.complex.findUnique({
    where: {
      id: String(params?.id),
    },
    select: {
      title: true,
      link: true,
      rating: true,
      placeId: true,
      amenitiesImgs: true,
      amenities: true,
      communityMap: true,
      apartmentAmenitiesImgs: true,
      apartmentAmenities: true,
      neighborhoodImgs: true,
      neighborhood: true,
    },
  });
  return {
    props: complex,
  };
};

const OPTIONS: EmblaOptionsType = { loop: true };

const Complex: React.FC<ComplexProps> = (props) => {
  let title = props.title;
  let webLink = props.link;
  let rating = props.rating;
  let placeId = props.placeId;
  let communityMap = props.communityMap;
  let amenitiesImgs = props.amenitiesImgs;
  let amenities = props.amenities;
  let apartmentAmenitiesImgs = props.apartmentAmenitiesImgs;
  let apartmentAmenities = props.apartmentAmenities;
  let neighborhoodImgs = props.neighborhoodImgs;
  let neighborhood = props.neighborhood;

  return (
    <Layout>
      <div className="mt-3 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-x-4 text-xs">
          <div className="flex">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <a
              target="_blank"
              rel="noreferrer"
              className="flex self-center pl-10 font-medium text-gray-600 hover:bg-gray-100"
              href={`https://search.google.com/local/reviews?placeid=${placeId}`}
            >
              <span>
                <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
              </span>
              <span className="px-1">{rating}</span>
              <span>(number)</span>
            </a>
          </div>
          <div className="flex">
            <FontAwesomeIcon
              icon={faHeartReg}
              className="w-6 h-6 text-black pr-2"
            />
            <span className="text-base font-medium underline">Save</span>
          </div>
        </div>
        <div className="mt-3">
          <a href={webLink} className="underline text-pink-500 text-sm">
            Community's website
          </a>
        </div>
        <div className="text-xl font-semibold mt-10">Community map</div>
        <div className="flex max-w-3xl mx-auto">
          <img src={communityMap} alt="" className="w-full" />
        </div>
        <div className="text-xl font-semibold mt-10">Comunity Amenities</div>
        <Carousel images={amenitiesImgs} options={OPTIONS} />
        <ListAmenities amenities={amenities} />
        <div className="text-xl font-semibold mt-10">Apartment Amenities</div>
        <Carousel images={apartmentAmenitiesImgs} options={OPTIONS} />
        <ListAmenities amenities={apartmentAmenities} />
        <div className="text-xl font-semibold mt-10">Neighborhhod</div>
        <Carousel images={neighborhoodImgs} options={OPTIONS} />
        <ListAmenities amenities={neighborhood} />
      </div>
    </Layout>
  );
};

export default Complex;
