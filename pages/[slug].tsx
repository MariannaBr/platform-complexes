import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import HeaderComplex from "../components/HeaderComplex";
import Devider from "../components/Devider";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ComplexProps } from "../components/Complex";
import prisma from "../lib/prisma";
import CategoryTitle from "../components/CategoryTitle";
import MetaData from "../components/MetaData";
import {
  titleCommunityWeb,
  titleCommunityAmenities,
  titleApartmentAmenities,
  titleNeighborhood,
  titleApartments,
} from "../lib/defaults";
import { getSortedApartments } from "../lib/functions";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const complex = await prisma.complex.findUnique({
    where: {
      slug: String(params?.slug),
    },
    select: {
      id: true,
      title: true,
      metaTitle: true,
      description: true,
      metaDescription: true,
      coordinates: true,
      link: true,
      slug: true,
      street: true,
      postal: true,
      image: true,
      rating: true,
      rateCount: true,
      placeId: true,
      amenitiesImgs: true,
      amenities: true,
      communityMap: true,
      apartmentAmenitiesImgs: true,
      apartmentAmenities: true,
      neighborhoodImgs: true,
      neighborhood: true,
      apartments: true,
    },
  });
  return {
    props: complex,
  };
};

const Complex: React.FC<ComplexProps> = (props) => {
  const {
    id,
    title,
    description,
    link,
    rating,
    rateCount,
    placeId,
    communityMap,
    amenitiesImgs,
    amenities,
    apartmentAmenitiesImgs,
    apartmentAmenities,
    neighborhoodImgs,
    neighborhood,
    apartments,
  } = props;

  const [showContent, setShowContent] = useState(false);

  const changeShowContent = () => {
    setShowContent(!showContent);
  };

  const sortedApartments = getSortedApartments(apartments, "price");

  return (
    <>
      <MetaData complex={props} />
      <Layout>
        <Header addClass="max-w-7xl mx-auto xl:px-0" />
        <Devider />
        <HeaderComplex
          id={id}
          title={title}
          placeId={placeId}
          rating={rating}
          rateCount={rateCount}
        />
        <div className="max-w-7xl mx-auto px-6 xl:px-0 text-justify">
          <div className="mb-2">
            <a
              href={link}
              target="_blank"
              className="underline text-pink-600 text-sm"
            >
              {titleCommunityWeb}
            </a>
          </div>
          <p className={`${!showContent && "line-clamp-3 lg:line-clamp-5"}`}>
            {description}
          </p>
          <button
            onClick={changeShowContent}
            className=" font-medium underline mt-1"
          >
            {showContent ? "Show less" : "Show more"}
          </button>

          {communityMap && (
            <div>
              <CategoryTitle title="Community map" />
              <div className="flex max-w-7xl mx-auto pt-6">
                <img src={communityMap} alt="" className="w-full" />
              </div>
            </div>
          )}
          <Category
            title={titleCommunityAmenities}
            images={amenitiesImgs}
            amenities={amenities}
          />
          <Category
            title={titleApartmentAmenities}
            images={apartmentAmenitiesImgs}
            amenities={apartmentAmenities}
          />
          <Category
            title={titleNeighborhood}
            images={neighborhoodImgs}
            amenities={neighborhood}
          />
          {/* {apartments && apartments.length > 0 && (
            <Category title={titleApartments} apartments={sortedApartments} />
          )} */}
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Complex;
