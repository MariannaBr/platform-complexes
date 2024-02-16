import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Complex, { ComplexProps } from "../components/Complex";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.complex.findMany({
    select: { id: true, title: true, rating: true, link: true, image: true },
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {props.feed.map((complex) => (
            <article
              key={complex.id}
              className="flex flex-col items-start justify-between"
            >
              <Complex complex={complex} />
            </article>
          ))}
        </div>
        ;
      </div>
    </Layout>
  );
};

export default Blog;
