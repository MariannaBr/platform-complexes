const data = {
  apartments: [
    {
      info: "Studio • 1 bath • 436 sqft • Available Furnished • Modern Collection",
      price: "$2,730",
      picture:
        "https://resource.avalonbay.com//floorplans/ca117/s2-436sf.jpg/1024/768",
      link: "https://www.avaloncommunities.com/california/san-francisco-apartments/avalon-dogpatch/apartment/CA117-CA117-00B-468/?furnished=false&moveInDate=05%2F01%2F2024&leaseTerm=15",
    },
  ],
};

// function cleaning(apartmentsData) {
//   // const apartmentsDataParsed = JSON.parse(apartmentsData);

//   var apartments = apartmentsData.apartments.map((item) => {
//     const info = item.info.split("•");
//     const bedrooms = info[0].trim();
//     const baths = info[1].trim();
//     const area = info[2].trim();
//     var price = null;
//     if (item.price.includes("$")) {
//       price = item.price;
//     }
//     const image = item.picture;
//     const apartment_link = item.link;
//     return { bedrooms, baths, area, price, image, apartment_link };
//   });
//   console.log(apartments);
// }

// cleaning(data);

// function testResponse() {
//   var apartmentsData = null;
//   // const response = JSON.stringify({
//   //   info: "3 beds • 2.5 baths • 1405 sqft • Signature Collection",
//   //   price: "$6,970",
//   //   picture:
//   //     "https://resource.avalonbay.com//floorplans/ca117/c2ts-1405sf.jpg/1024/768",
//   //   link: "https://www.avaloncommunities.com/california/san-francisco-apartments/avalon-dogpatch/apartment/CA117-CA117-00C-179/?furnished=false&moveInDate=05%2F12%2F2024&leaseTerm=15",
//   // });
//   const response = "<doc>";
//   if (response) {
//     try {
//       JSON.parse(response);
//       apartmentsData = JSON.parse(response);
//     } catch {
//       console.log("Invalid JSON as scraped data.");
//     }
//   }
//   console.log(apartmentsData);
// }

// testResponse();

import prisma from "../prisma.ts";

async function saveApartmentToDB(complex, apartment, db) {
  const apartmentData = await prisma[db].create(
    {
      data: {
        complexId: complex.id,
        beds: apartment.bedrooms,
        baths: apartment.baths,
        area: apartment.area,
        price: apartment.price,
        image: apartment.image,
        link: apartment.apartment_link ?? complex.availabilityLink,
      },
    },
    prisma
  );

  return;
}

const db = "apartment";
const complex = {
  id: "123",
};
const apartment = {
  bedrooms: "2",
  baths: "2",
  area: "12",
  price: "2222",
  image: "image",
  apartment_link: "link",
};

saveApartmentToDB(complex, apartment, db);
