import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { ComplexProps } from "../../components/Complex";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const complex = await prisma.complex.findUnique({
    where: {
      id: String(params?.id),
    },
    select: { title: true },
  });
  return {
    props: complex,
  };
};

const Complex: React.FC<ComplexProps> = (props) => {
  let title = props.title;

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <ReactMarkdown children={props.description} />
      </div>
    </Layout>
  );
};

export default Complex;
