import React, { useState } from "react";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Devider from "../components/Devider";
import SFHomepage from "../components/SFHomepage";
import LinkingButton from "../components/LinkingButton";
import Complex, { ComplexProps } from "../components/Complex";
import Map from "../components/Map";
import MetaData from "../components/MetaData";
import {
  showMapText,
  showListText,
  LocationData,
  SFData
} from "../lib/defaults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { saveApartments } from "../lib/data/apartmentsScrape.mjs";
import { getLocationData, getLinkingData } from "../lib/functions";
import { DistrictProps } from "../components/District";

//saveApartments();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const host = req.headers.host;
  const locationData = getLocationData(host);

  const complexes = await prisma.complex.findMany({
    where: {
      show: Boolean(true)
    },
    select: {
      id: true,
      title: true,
      slug: true,
      location: true,
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
          link: true
        }
      },
      district: {
        select: {
          id: true,
          title: true,
          link: true
        }
      }
    },
    orderBy: {
      rating: "desc"
    }
  });

  const districts = await prisma.district.findMany({
    select: {
      id: true,
      title: true,
      link: true,
      image: true,
      complexes: {
        select: {
          id: true
        }
      }
    }
  });

  const show = process.env.VERCEL_ENV === "development";
  return {
    props: { complexes, show, locationData, districts }
  };
};

type Props = {
  complexes: ComplexProps[];
  show: boolean;
  locationData: LocationData;
  districts: DistrictProps[];
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

  const linkingData = getLinkingData(props.locationData.title);
  const isSFHomepage = props.locationData.location === SFData.location;
  const topComplexes = props.complexes.slice(0, 10);
  const locationComplexes = props.complexes
    .filter((obj) => obj.location === props.locationData.location)
    .sort((a, b) => a.title.localeCompare(b.title));
  const addClass = isSFHomepage ? "max-w-7xl mx-auto xl:px-0" : "";

  return (
    <>
      <MetaData
        type="SearchResultsPage"
        title={props.locationData.metaTitleHome}
        description={props.locationData.metaDescriptionHome}
        image={props.locationData.metaImageHome}
        url={props.locationData.linkHome}
        complexes={locationComplexes}
      />
      <Layout>
        <Header
          isHomepage={true}
          title={props.locationData.title}
          addClass={addClass}
          isSFHomepage={isSFHomepage}
        />
        <Devider />
        {isSFHomepage && (
          <SFHomepage complexes={topComplexes} districts={props.districts} />
        )}
        {!isSFHomepage && (
          <>
            <div className="flex lg:hidden justify-center mb-6">
              {linkingData.map((item) => (
                <LinkingButton
                  key={item.linkTitle}
                  linkTitle={item.linkTitle}
                  link={item.link}
                />
              ))}
            </div>
            <div className="relative lg:hidden">
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
                <Map
                  complexes={locationComplexes}
                  mapCoordinations={props.locationData.mapCoordinations}
                />
              </div>
            )}
            {!showMap && (
              <div className="flex content_height">
                <div className="mx-auto w-full lg:w-2/3 px-6 hide_scrollbar pb-6">
                  <div className="mx-auto grid grid-cols-1 gap-x-8 3xl:gap-x-16 gap-y-8 lg:gap-y-20 3xl:gap-y-24 lg:mx-0 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
                    {locationComplexes.map((complex) => (
                      <div
                        key={complex.id}
                        className="flex flex-col items-start justify-between shadow-lg rounded-2xl"
                      >
                        <Complex complex={complex} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:flex lg:w-1/3">
                  <Map
                    complexes={locationComplexes}
                    mapCoordinations={props.locationData.mapCoordinations}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </Layout>
    </>
  );
};

export default Homepage;
