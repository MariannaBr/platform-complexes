import React from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Devider from "../components/Devider";
import Complex, { ComplexProps } from "../components/Complex";
import Map from "../components/Map";
import MetaData from "../components/MetaData";
import {
  metaTitleHome,
  metaDescriptionHome,
  linkHome,
  metaImageHome,
} from "../lib/defaults";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.complex.findMany({
    where: {
      location: String("Dogpatch"),
      show: Boolean(true),
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
    },
  });
  const show = process.env.VERCEL_ENV === "development";
  return {
    props: { feed, show },
    revalidate: 10,
  };
};

type Props = {
  feed: ComplexProps[];
  show: boolean;
};

const Homepage: React.FC<Props> = (props) => {
  return (
    <>
      <MetaData
        type="SearchResultsPage"
        title={metaTitleHome}
        description={metaDescriptionHome}
        image={metaImageHome}
        url={linkHome}
        complexes={props.feed}
      />
      <Layout>
        <Header isHomepage={true} />
        <Devider />
        <div className="flex content_height">
          <div className="mx-auto w-1/2 lg:w-2/3 px-2 lg:px-6 hide_scrollbar">
            <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-8 lg:gap-y-20 lg:mx-0 lg:grid-cols-3">
              {props.feed.map((complex) => (
                <div
                  key={complex.id}
                  className="flex flex-col items-start justify-between"
                >
                  <Complex complex={complex} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 lg:w-1/3">
            <Map complexes={props.feed} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Homepage;
