import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Complex, { ComplexProps } from "../components/Complex"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.complex.findMany({
        select: { id: true,
                  title: true,
                  rating: true,
                  link: true,
                  image: true },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: ComplexProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="">
        <main>
          {props.feed.map((complex) => (
            <div key={complex.id} className="">
              <Complex complex={complex} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Blog
