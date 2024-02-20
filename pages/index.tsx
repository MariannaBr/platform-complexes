import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Complex, { ComplexProps } from "../components/Complex";
import Map from "../components/Map";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.complex.findMany({
    select: {
      id: true,
      title: true,
      rating: true,
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

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="flex h-full">
        <div className="mx-auto w-2/3 px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {props.feed.map((complex) => (
              <article
                key={complex.id}
                className="flex flex-col items-start justify-between"
              >
                <Complex complex={complex} />
              </article>
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

export default Blog;
