import { parseCurrency } from "../functions";
import { ComplexProps } from "../../components/Complex";

type PropType = {
  complex?: ComplexProps;
  complexUrl?: string;
  metaUrl?: string;
};

export const MetaDataComplex = ({ complex, complexUrl, metaUrl }: PropType) => {
  const metaTitle = complex.metaTitle;
  const metaDescription = complex.metaDescription;
  const image = complex.image;
  const url = complexUrl ? complexUrl : metaUrl + complex.slug;
  const street = complex.street;
  const postal = complex.postal;
  const rating = complex.rating;
  const rateCount = complex.rateCount;
  const amenities = complex.amenities;
  const apartmentAmenities = complex.apartmentAmenities;
  const [longitude, latitude] = complex.coordinates;
  const amenitiesList = amenities.concat(apartmentAmenities);
  const apartments = complex.apartments;

  let prices = [];
  let lowPrice = "";
  let highPrice = "";

  if (apartments && apartments.length > 0) {
    apartments.forEach((apartment) => {
      if (apartment.price) {
        prices.push(apartment.price);
      }
    });
  }

  if (prices && prices.length > 0) {
    if (prices.length > 1) {
      const pricesSorted = prices.sort(
        (a, b) => parseCurrency(a) - parseCurrency(b)
      );
      lowPrice = pricesSorted[0];
      highPrice = pricesSorted.at(-1);
    } else {
      lowPrice = prices[0];
      highPrice = prices[0];
    }
  }

  const price = lowPrice + "-" + highPrice;

  return {
    "@context": "http://schema.org",
    "@type": "ItemPage",
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
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: latitude,
        longitude: longitude,
      },
      priceRange: price,
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
    mainEntity: [
      {
        url: url,
        description: metaDescription,
        image: image,
        address: {
          "@type": "PostalAddress",
          streetAddress: street,
          addressLocality: "San Francisco",
          addressRegion: "CA",
          postalCode: postal,
          addressCountry: "US",
        },
        containsPlace: {
          "@type": "Apartment",
          petsAllowed: true,
        },
        containedInPlace: {
          "@type": "LocalBusiness",
          address: {
            "@type": "PostalAddress",
            streetAddress: street,
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: postal,
            addressCountry: "US",
          },
          priceRange: price,
          amenityFeature: amenitiesList,
          image: image,
          name: metaTitle,
          "@id": url,
        },
        "@type": "ApartmentComplex",
        name: metaTitle,
        "@id": url,
      },
    ],
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
    objects = complexes.map((complex) => MetaDataComplex({ complex, metaUrl }));
  }

  return {
    "@context": "http://schema.org",
    "@type": type,
    name: title,
    "@id": metaUrl,
    url: metaUrl,
    image: metaImage,
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
