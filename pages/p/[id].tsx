import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Devider from "../../components/Devider";
import { ComplexProps } from "../../components/Complex";
import prisma from "../../lib/prisma";
import Carousel from "../../components/Carousel";
import { EmblaOptionsType } from "embla-carousel";
import ListAmenities from "../../components/ListAmenities";
import CategoryTitle from "../../components/CategoryTitle";
import {
  titleCommunityWeb,
  titleCommunityAmenities,
  titleApartmentAmenities,
  titleNeighborhood,
} from "../../lib/defaults";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const complex = await prisma.complex.findUnique({
    where: {
      id: String(params?.id),
    },
    select: {
      title: true,
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

const OPTIONS: EmblaOptionsType = { loop: true };

const Complex: React.FC<ComplexProps> = (props) => {
  let title = props.title;
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
      <Header
        title={title}
        placeId={placeId}
        rating={rating}
        rateCount={rateCount}
        isHomepage={false}
      />
      <Devider />
      <div className="mt-3 max-w-7xl mx-auto">
        <div className="mt-3">
          <a href={webLink} className="underline text-pink-500 text-sm">
            {titleCommunityWeb}
          </a>
        </div>
        <CategoryTitle title="Community map" />
        <div className="flex max-w-6xl mx-auto pt-6">
          <img src={communityMap} alt="" className="w-full" />
        </div>
        <CategoryTitle title={titleCommunityAmenities} />
        <Carousel images={amenitiesImgs} options={OPTIONS} />
        <ListAmenities amenities={amenities} />
        <CategoryTitle title={titleApartmentAmenities} />
        <Carousel images={apartmentAmenitiesImgs} options={OPTIONS} />
        <ListAmenities amenities={apartmentAmenities} />
        <CategoryTitle title={titleNeighborhood} />
        <Carousel images={neighborhoodImgs} options={OPTIONS} />
        <ListAmenities amenities={neighborhood} />
      </div>
    </Layout>
  );
};

export default Complex;
