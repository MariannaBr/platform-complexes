import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export type ComplexProps = {
  id: string;
  title: string;
  content: string;
  link: string;
  image: string;
  rating: string;
};

const Complex: React.FC<{ complex: ComplexProps }> = ({ complex }) => {
  return (
    <div
      onClick={() => Router.push("/p/[id]", `/p/${complex.id}`)}
      className=" bg-blue-50"
    >
      <div className="relative w-full">
        <img
          src={complex.image}
          alt=""
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="group relative">
          <div className="mt-3 flex items-center gap-x-4 text-xs">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              <a href={complex.link}>
                <span className="absolute inset-0" />
                {complex.title}
              </a>
            </h3>
            <a
              href={complex.link}
              className="relative z-1 px-3 font-medium text-gray-600 hover:bg-gray-100"
            >
              <span>
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="pl-1">{complex.rating}</span>
            </a>
          </div>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {complex.content}
          </p>
        </div>
      </div>
      {/* <ReactMarkdown children={complex.content} /> */}
    </div>
  );
};

export default Complex;
