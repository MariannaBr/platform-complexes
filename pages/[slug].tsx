import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import HeaderComplex from "../components/HeaderComplex";
import Devider from "../components/Devider";
import Category from "../components/Category";
import Complex from "../components/Complex";
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
  titleSimilarCommunitites,
  locationDogpatch,
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
      apartments: {
        select: {
          id: true,
          complexId: true,
          beds: true,
          baths: true,
          area: true,
          price: true,
          image: true,
          link: true,
        },
      },
    },
  });

  const complexes = await prisma.complex.findMany({
    where: {
      location: String(locationDogpatch),
      show: Boolean(true),
      slug: {
        not: String(params?.slug),
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      rating: true,
      rateCount: true,
      link: true,
      image: true,
      description: true,
      placeId: true,
      coordinates: true,
      metaTitle: true,
      metaDescription: true,
      street: true,
      postal: true,
      amenities: true,
      apartmentAmenities: true,
      apartments: {
        select: {
          id: true,
          complexId: true,
          beds: true,
          baths: true,
          area: true,
          price: true,
          image: true,
          link: true,
        },
      },
    },
    orderBy: {
      title: "asc",
    },
  });

  return {
    props: {
      complex,
      complexes,
    },
  };
};

type Props = {
  complex: ComplexProps;
  complexes: ComplexProps[];
};

const ComplexPage: React.FC<Props> = (props) => {
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
  } = props.complex;

  const [showContent, setShowContent] = useState(false);

  const changeShowContent = () => {
    setShowContent(!showContent);
  };

  const sortedApartments = getSortedApartments(apartments, "price");

  return (
    <>
      <MetaData complex={props.complex} />
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
          {link && (
            <div className="mb-2">
              <a
                href={link}
                target="_blank"
                className="underline text-pink-600 text-sm"
              >
                {titleCommunityWeb}
              </a>
            </div>
          )}
          <p className={`${!showContent && "line-clamp-3 lg:line-clamp-5"}`}>
            {description}
          </p>
          <button
            onClick={changeShowContent}
            className=" font-medium underline mt-1"
          >
            {showContent ? "Show less" : "Show more"}
          </button>
          {sortedApartments && sortedApartments.length > 0 && (
            <Category title={titleApartments} apartments={sortedApartments} />
          )}

          {communityMap && (
            <div>
              <CategoryTitle title="Community map" />
              <div className="flex max-w-7xl mx-auto pt-6">
                <img
                  src={communityMap}
                  alt="community map"
                  className="w-full"
                />
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
          <CategoryTitle title={titleSimilarCommunitites} />
          <div className="mx-auto w-full hide_scrollbar pb-6">
            <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-8 lg:gap-y-20 lg:mx-0 md:grid-cols-2 lg:grid-cols-3">
              {props.complexes.map((complex) => (
                <div
                  key={complex.id}
                  className="flex flex-col items-start justify-between shadow-lg rounded-2xl"
                >
                  <Complex complex={complex} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default ComplexPage;
