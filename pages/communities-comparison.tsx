import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Devider from "../components/Devider";
import Footer from "../components/Footer";
import Table from "../components/Table";
import { ComplexProps } from "../components/Complex";
import MetaData from "../components/MetaData";
import prisma from "../lib/prisma";
import { getLocationData, LocationData } from "../lib/functions";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const host = req.headers.host;
  const locationData = getLocationData(host);

  const feed = await prisma.complex.findMany({
    where: {
      location: String(locationData.location),
      show: Boolean(true),
    },
    select: {
      title: true,
      slug: true,
      rating: true,
      rateCount: true,
      coordinates: true,
      metaTitle: true,
      metaDescription: true,
      street: true,
      postal: true,
      amenities: true,
      apartmentAmenities: true,
      roofDeck: true,
      bbq: true,
      gym: true,
      pool: true,
      workSpaces: true,
      gameRoom: true,
      packing: true,
      bikeStorage: true,
      petFriendly: true,
      garage: true,
      evCharging: true,
      hardFloors: true,
      inUnitWasher: true,
      bigWindows: true,
      airCondition: true,
      balconies: true,
      modernStyle: true,
      furnishedOpt: true,
      walkInCloset: true,
      storage: true,
      inclEnergies: true,
      floorHeating: true,
    },
    orderBy: {
      title: "asc",
    },
  });
  const show = process.env.VERCEL_ENV === "development";
  return {
    props: { feed, show, locationData },
  };
};

type Props = {
  feed: ComplexProps[];
  show: boolean;
  locationData: LocationData;
};

const TablePage: React.FC<Props> = (props) => {
  return (
    <>
      <MetaData
        type="SearchResultsPage"
        title={props.locationData.metaTitleComparison}
        description={props.locationData.metaDescriptionComparison}
        image={props.locationData.metaImageHome}
        url={props.locationData.metaLinkTable}
        complexes={props.feed}
      />
      <Layout>
        <Header isHomepage={true} title={props.locationData.title} />
        <Devider />
        <div className="mx-6 pt-6">
          <Table complexes={props.feed} />
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default TablePage;
