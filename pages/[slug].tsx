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
import PageMetadata from "../components/PageMetaData";
import {
  titleCommunityWeb,
  titleCommunityAmenities,
  titleApartmentAmenities,
  titleNeighborhood,
  linkHome,
} from "../lib/defaults";

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
      link: true,
      slug: true,
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
    },
  });
  return {
    props: complex,
  };
};

const Complex: React.FC<ComplexProps> = (props) => {
  let id = props.id;
  let title = props.title;
  let metaTitle = props.metaTitle;
  let description = props.description;
  let metaDescription = props.metaDescription;
  let metaLink = linkHome + props.slug;
  let webLink = props.link;
  let image = props.image;
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

  const [showContent, setShowContent] = useState(false);

  const changeShowContent = () => {
    setShowContent(!showContent);
  };

  return (
    <>
      <PageMetadata
        title={metaTitle}
        description={metaDescription}
        image={image}
        url={metaLink}
      />
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
              href={webLink}
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
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Complex;
