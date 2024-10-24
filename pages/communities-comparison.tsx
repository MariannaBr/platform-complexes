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
import {
  metaTitleComparison,
  metaDescriptionComparison,
  metaImageHome,
  metaLinkTable,
} from "../lib/defaults";
import { getLocation } from "../lib/functions";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const host = req.headers.host;
  const location = getLocation(host);

  const feed = await prisma.complex.findMany({
    where: {
      location: String(location),
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
    props: { feed, show, location },
  };
};

type Props = {
  feed: ComplexProps[];
  show: boolean;
  location: string;
};

const TablePage: React.FC<Props> = (props) => {
  return (
    <>
      <MetaData
        type="SearchResultsPage"
        title={metaTitleComparison}
        description={metaDescriptionComparison}
        image={metaImageHome}
        url={metaLinkTable}
        complexes={props.feed}
      />
      <Layout>
        <Header isHomepage={true} location={props.location} />
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
