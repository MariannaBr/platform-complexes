import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Category from "../components/Category";
import CategoryTitle from "../components/CategoryTitle";
import Devider from "../components/Devider";
import Footer from "../components/Footer";
import Table from "../components/Table";
import Complex, { ComplexProps } from "../components/Complex";
import prisma from "../lib/prisma";
import {
  titleMyFavoritesApartments,
  titleMyavoritesComplexes,
} from "../lib/defaults";
import { getLocalStorageFavorites } from "../lib/functions";
import MetaData from "../components/MetaData";
import {
  metaTitleFavorites,
  metaDescriptionFavorites,
  metaLinkFavorites,
  metaImageHome,
  domainDogpatch,
  domainMissionBay,
  locationDogpatch,
  locationMissionBay,
} from "../lib/defaults";
import { ApartmentProps } from "../components/Apartment";
import { getSortedApartments } from "../lib/functions";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const host = req.headers.host;

  let location = "";

  // Check the domain and set location accordingly
  if (host === domainDogpatch) {
    location = locationDogpatch;
  } else if (host === domainMissionBay) {
    location = locationMissionBay;
  } else if (host === "localhost:3000") {
    location = locationMissionBay;
  }
  const feed = await prisma.complex.findMany({
    where: {
      location: String(location),
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
    props: { feed, location },
  };
};

type Props = {
  feed: ComplexProps[];
  location: string;
};

const FavoritesPage: React.FC<Props> = (props) => {
  const [savedFavorites, setSavedFavorites] = useState([]);
  const [favorites, setFavorites] = useState<ComplexProps[]>([]);
  const [apartments, setApartments] = useState<ApartmentProps[]>([]);

  useEffect(() => {
    setSavedFavorites(getLocalStorageFavorites());
  }, []);

  useEffect(() => {
    const newFavorites = props.feed.filter((complex) =>
      savedFavorites.includes(complex.id)
    );
    setFavorites(newFavorites);
  }, [savedFavorites, props.feed]);

  useEffect(() => {
    const favoriteApartments: ApartmentProps[] = [];
    favorites.forEach((complex) => {
      if (complex.apartments) {
        const updatedApartments = complex.apartments.map((apartment) => ({
          ...apartment,
          complexTitle: complex.title,
        }));
        favoriteApartments.push(...updatedApartments);
      }
    });
    const sortedApartments = getSortedApartments(favoriteApartments, "price");
    setApartments(sortedApartments);
  }, [favorites]);

  return (
    <>
      <MetaData
        type="SearchResultsPage"
        title={metaTitleFavorites}
        description={metaDescriptionFavorites}
        image={metaImageHome}
        url={metaLinkFavorites}
        complexes={favorites}
      />
      <Layout>
        <Header
          isHomepage={true}
          addClass="max-w-7xl mx-auto xl:px-0"
          location={props.location}
        />
        <Devider />
        <div className="max-w-7xl px-6 mx-auto xl:px-0">
          {favorites && favorites.length > 0 && (
            <Category
              title={titleMyFavoritesApartments}
              apartments={apartments}
              isFavorite={true}
            />
          )}
          <CategoryTitle title={titleMyavoritesComplexes} />
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-20 lg:mx-0">
            {favorites.map((complex) => (
              <article
                key={complex.id}
                className="flex flex-col items-start justify-between shadow-lg rounded-2xl"
              >
                <Complex complex={complex} isFavoritesPage={true} />
              </article>
            ))}
          </div>
          <div className="mt-14">
            <Table complexes={favorites} />
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default FavoritesPage;
