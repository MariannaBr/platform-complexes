import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type ComplexProps = {
  id: string;
  title: string;
  content: string;
  link: string;
  image: string;
  rating: string
};

const Complex: React.FC<{ complex: ComplexProps }> = ({ complex }) => {
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${complex.id}`)}>
      <h2 className="text-3xl font-bold underline">{complex.title}</h2>
      <small>{complex.link}</small>
      <small>{complex.rating}</small>
      <ReactMarkdown children={complex.content} />
    </div>
  );
};

export default Complex;
