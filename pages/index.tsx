import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Devider from "../components/Devider";
import Complex, { ComplexProps } from "../components/Complex";
import Map from "../components/Map";
import prisma from "../lib/prisma";
import { titleDogpatch } from "../lib/defaults";

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

const Homepage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Header isFavorites={false} />
      <Devider />
      <div className="flex content_height">
        <div className="mx-auto w-2/3 px-6 hide_scrollbar">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
        <div className="w-1/3">
          <Map complexes={props.feed} />
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
