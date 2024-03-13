import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Devider from "../components/Devider";
import Footer from "../components/Footer";
import Table from "../components/Table";
import Complex, { ComplexProps } from "../components/Complex";
import prisma from "../lib/prisma";
import { titleMyFavorites } from "../lib/defaults";
import { getLocalStorageFavorites } from "../lib/functions";

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
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: ComplexProps[];
};

const FavoritesPage: React.FC<Props> = (props) => {
  const [savedFavorites, setSavedFavorites] = useState([]);
  const [favorites, setFavorites] = useState<ComplexProps[]>([]);

  useEffect(() => {
    setSavedFavorites(getLocalStorageFavorites());
  }, []);

  useEffect(() => {
    const newFavorites = props.feed.filter((complex) =>
      savedFavorites.includes(complex.id)
    );
    setFavorites(newFavorites);
  }, [savedFavorites, props.feed]);

  return (
    <Layout>
      <Header addClass="max-w-7xl mx-auto xl:px-0" />
      <Devider />
      <div className="max-w-7xl mx-4 xl:mx-auto">
        <div className="pb-4 lg:py-6">
          <h1 className="text-2xl font-bold leading-7 text-gray-900">
            {titleMyFavorites}
          </h1>
        </div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-20 lg:mx-0">
          {favorites.map((complex) => (
            <article
              key={complex.id}
              className="flex flex-col items-start justify-between"
            >
              <Complex complex={complex} />
            </article>
          ))}
        </div>
        <div className="mt-14">
          <Table complexes={favorites} />
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default FavoritesPage;
