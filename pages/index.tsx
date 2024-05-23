import React, { useState } from "react";
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
  showMapText,
  showListText,
} from "../lib/defaults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { saveApartments } from "../lib/data/apartmentsScrape.mjs";

export const getStaticProps: GetStaticProps = async () => {
  //await saveApartments();
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
  const [showMap, setShowMap] = useState(false);
  const [buttonText, setButtonText] = useState(showMapText);
  const [icon, setIcon] = useState<IconDefinition>(faMap);

  const changeShowMap = () => {
    setShowMap(!showMap);
    setButtonText(buttonText === showMapText ? showListText : showMapText);
    setIcon(icon === faMap ? faList : faMap);
  };

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
        <div className="relative md:hidden">
          <button
            onClick={changeShowMap}
            type="button"
            className="flex absolute right-0 left-0 z-20 mx-auto w-24 rounded-md bg-pink-600 px-2 py-1 text-xs text-white shadow-sm
            hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-white items-end"
          >
            {buttonText}
            <FontAwesomeIcon icon={icon} className="w-4 h-4 pl-2" />
          </button>
        </div>
        {showMap && (
          <div className="relative w-full content_height">
            <Map complexes={props.feed} />
          </div>
        )}
        {!showMap && (
          <div className="flex content_height">
            <div className="mx-auto w-full md:w-2/3 px-6 hide_scrollbar pb-6">
              <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-8 lg:gap-y-20 lg:mx-0 md:grid-cols-2 lg:grid-cols-3">
                {props.feed.map((complex) => (
                  <div
                    key={complex.id}
                    className="flex flex-col items-start justify-between shadow-lg rounded-2xl"
                  >
                    <Complex complex={complex} />
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex md:w-1/3">
              <Map complexes={props.feed} />
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Homepage;
