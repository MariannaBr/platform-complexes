import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Devider from "../components/Devider";
import Complex, { ComplexProps } from "../components/Complex";
import prisma from "../lib/prisma";
import { titleMyFavorites } from "../lib/defaults";
import { getLocalStorageFavorites } from "../lib/localStorage";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.complex.findMany({
    where: {
      location: String("Dogpatch"),
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
  useEffect(() => {
    setSavedFavorites(getLocalStorageFavorites());
  }, []);

  const favorites = [];
  for (let i = 0; i < props.feed.length; i++) {
    if (savedFavorites.includes(props.feed[i].id)) {
      favorites.push(props.feed[i]);
    }
  }

  return (
    <Layout>
      <Header
        title={titleMyFavorites}
        isHomepage={false}
        addClass="max-w-7xl mx-auto"
      />
      <Devider />
      <div className="max-w-7xl mx-auto">
        <div className="">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {favorites.map((complex) => (
              <article
                key={complex.id}
                className="flex flex-col items-start justify-between"
              >
                <Complex complex={complex} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FavoritesPage;
