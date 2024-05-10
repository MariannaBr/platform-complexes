import { linkHome } from "../defaults";
import logo from "../../public/favicon.png";

export const MetaDataComplex = ({ complex }) => {
  const metaTitle = complex.metaTitle;
  const metaDescription = complex.metaDescription;
  const image = complex.image;
  const url = linkHome + complex.slug;
  const coordinates = complex.coordinates;
  const street = complex.street;
  const postal = complex.postal;
  const rating = complex.rating;
  const rateCount = complex.rateCount;
  const amenities = complex.amenities;
  const apartmentAmenities = complex.apartmentAmenities;
  const latitude = coordinates[1];
  const longitude = coordinates[0];
  const amenitiesList = amenities.concat(apartmentAmenities);

  return {
    "@context": "http://schema.org",
    "@type": "ItemPage",
    logo: logo,
    about: {
      "@type": "LocalBusiness",
      name: metaTitle,
      "@id": url,
      url: url,
      image: image,
      description: metaDescription,
      address: {
        "@type": "PostalAddress",
        streetAddress: street,
        addressLocality: "San Francisco",
        addressRegion: "CA",
        postalCode: postal,
        addressCountry: "USA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: latitude,
        longitude: longitude,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating,
        ratingCount: rateCount,
        itemReviewed: {
          "@type": "ApartmentComplex",
          name: metaTitle,
          "@id": url,
        },
      },
      amenityFeature: amenitiesList,
    },
  };
};

export const PageMetaData = ({
  type,
  title,
  description,
  metaImage,
  metaUrl,
  complexes,
}) => {
  let objects = [];
  if (complexes) {
    objects = complexes.map((complex) => MetaDataComplex({ complex }));
  }

  return {
    "@context": "http://schema.org",
    "@type": type,
    name: title,
    "@id": metaUrl,
    url: metaUrl,
    image: metaImage,
    logo: logo,
    description: description,
    contentLocation: {
      containedIn: {
        "@type": "State",
        name: "CA",
      },
      "@type": "City",
      name: "San Francisco",
    },
    about: objects,
  };
};
