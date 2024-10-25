import Head from "next/head";
import { MetaDataComplex, PageMetaData } from "../lib/data/structuredMetaData";
import { ComplexProps } from "../components/Complex";

type PropType = {
  type?: string;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  complex?: ComplexProps;
  complexes?: object[];
};

const MetaData: React.FC<PropType> = ({
  type,
  title,
  description,
  image,
  url,
  complex,
  complexes,
}) => {
  let metaTitle = title;
  let metaDescription = description;
  let metaImage = image;
  let metaUrl = url;
  let jsonLd = {};
  jsonLd = PageMetaData({
    type,
    title,
    description,
    metaImage,
    metaUrl,
    complexes,
  });

  if (complex) {
    metaTitle = complex.metaTitle;
    metaDescription = complex.metaDescription;
    metaImage = complex.image;
    let complexUrl = url + complex.slug;
    jsonLd = MetaDataComplex({ complex, complexUrl });
  }

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content="website" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};

export default MetaData;
