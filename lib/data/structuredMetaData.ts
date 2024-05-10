import { linkHome } from "../defaults";
import { parseCurrency } from "../functions";

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
      prices.sort((a, b) => parseCurrency(a) - parseCurrency(b));
      lowPrice = prices[0];
      highPrice = prices[-1];
    }
    lowPrice = prices[0];
    highPrice = prices[0];
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
        addressCountry: "USA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: latitude,
        longitude: longitude,
      },
      priceRange: price,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: lowPrice,
        highPrice: highPrice,
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
    mainEntity: [
      {
        url: url,
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
        image: image,
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
        containsPlace: {
          "@type": "Apartment",
          petsAllowed: true,
        },
        containedInPlace: {
          "@type": "LocalBusiness",
          priceRange: price,
          amenityFeature: amenitiesList,
          image: image,
          address: {
            "@type": "PostalAddress",
            streetAddress: street,
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: postal,
            addressCountry: "USA",
          },
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
    objects = complexes.map((complex) => MetaDataComplex({ complex }));
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
