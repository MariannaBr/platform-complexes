import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import HeaderComplex from "../components/HeaderComplex";
import Devider from "../components/Devider";
import Category from "../components/Category";
import Navigation from "../components/Navigation";
import { ComplexProps } from "../components/Complex";
import prisma from "../lib/prisma";
import CategoryTitle from "../components/CategoryTitle";
import {
  titleCommunityWeb,
  titleCommunityAmenities,
  titleApartmentAmenities,
  titleNeighborhood,
} from "../lib/defaults";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const complex = await prisma.complex.findUnique({
    where: {
      slug: String(params?.slug),
    },
    select: {
      title: true,
      description: true,
      link: true,
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
    },
  });
  return {
    props: complex,
  };
};

const Complex: React.FC<ComplexProps> = (props) => {
  let title = props.title;
  let description = props.description;
  let webLink = props.link;
  let rating = props.rating;
  let rateCount = props.rateCount;
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
      <Navigation />
      <Devider />
      <HeaderComplex
        title={title}
        placeId={placeId}
        rating={rating}
        rateCount={rateCount}
        isHomepage={false}
      />
      <div className="max-w-7xl mx-auto">
        <p>{description}</p>
        <a href={webLink} className="underline text-pink-500 text-sm">
          {titleCommunityWeb}
        </a>
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
      </div>
    </Layout>
  );
};

export default Complex;