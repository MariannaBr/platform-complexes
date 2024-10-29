import prisma from "../prisma.ts";
import scrapingbee from "scrapingbee";
import {
  getParamsAvalon,
  getParamsMariposa,
  getParamsTenn,
  getParamsPotrero,
  getParamsMartin,
  getParamsGantry,
  getParamsOAM,
  getParamsWindsor,
  getParamsChase,
  getParamsWindsorMissionBay,
  getParamsAvalonMissionBay,
  getParamsVenue,
  getParamsStrata,
  getParamsAzure,
  getParamsVerde,
  getParamsCanyon,
  getParamsEdgewater,
  getParamsChannel,
} from "./scrapingParams.mjs";
import {
  getApartmentsChase,
  getApartmentsAvalon,
  getApartmentsMariposa,
  getApartmentsTenn,
  getApartmentsPotrero,
  getApartmentsMartin,
  getApartmentsGantry,
  getApartmentsOAM,
  getApartmentsWindsor,
  getApartmentsWindsorMissionBay,
  getApartmentsAvalonMissionBay,
  getApartmentsVenue,
  getApartmentsStrata,
  getApartmentsAzure,
  getApartmentsVerde,
  getApartmentsCanyon,
  getApartmentsEdgewater,
  getApartmentsChannel,
} from "./cleanedScrapedData.mjs";

export async function saveApartments() {
  var success = false;
  const complexes = await getComplexes();
  if (complexes) {
    for (const complex of complexes) {
      console.log(`Scraping for complex ${complex.title} started.`);
      const apartments = await getApartments(
        complex.id,
        complex.availabilityLink
      );
      if (apartments && apartments.length > 0) {
        await deleteApartmentsFromDB(complex.id);
        apartments.forEach((apartment) => {
          saveApartmentToDB(complex, apartment, "apartmentRaw");
          saveApartmentToDB(complex, apartment, "apartment");
        }, apartments); // check if needed
      }
      const oldApartmentCount = complex.apartments.length;
      const newApartmentCount = apartments?.length;
      console.log(`Old apartment count: ${oldApartmentCount}`);
      console.log(`New apartment count: ${newApartmentCount}`);
    }
  }
  return success;
}

const complexScrapeSpecifications = {
  cltohgdfs0000ojznsx59m20f: {
    getComplexApartments: getApartmentsChase,
    getComplexParams: getParamsChase,
  },
  clso0gn4b000111l2vkugd9hr: {
    getComplexApartments: getApartmentsAvalon,
    getComplexParams: getParamsAvalon,
  },
  clsw3h95f00011ht0ws6re5m9: {
    getComplexApartments: getApartmentsMariposa,
    getComplexParams: getParamsMariposa,
  },
  clsw3n29300041ht0xkt6xnck: {
    getComplexApartments: getApartmentsTenn,
    getComplexParams: getParamsTenn,
  },
  clsw3fsrp00001ht01srb6fn0: {
    getComplexApartments: getApartmentsPotrero,
    getComplexParams: getParamsPotrero,
  },
  clso0h2jb000211l2zth2tp7q: {
    getComplexApartments: getApartmentsMartin,
    getComplexParams: getParamsMartin,
  },
  clsw3ipju00021ht0vjhh2ymf: {
    getComplexApartments: getApartmentsGantry,
    getComplexParams: getParamsGantry,
  },
  clsw3ltv200031ht0qfaojbyk: {
    getComplexApartments: getApartmentsOAM,
    getComplexParams: getParamsOAM,
  },
  clsoxku0p000311l2lepcpi8w: {
    getComplexApartments: getApartmentsWindsor,
    getComplexParams: getParamsWindsor,
  },
  //MISSION BAY
  cm2eygdbn0003zjkvsbi62a6e: {
    getComplexApartments: getApartmentsWindsorMissionBay,
    getComplexParams: getParamsWindsorMissionBay,
  },
  cm2eyvlx00008zjkvm628x98b: {
    getComplexApartments: getApartmentsAvalonMissionBay,
    getComplexParams: getParamsAvalonMissionBay,
  },
  cm2ez0ga10009zjkvkcbahtuu: {
    getComplexApartments: getApartmentsVenue,
    getComplexParams: getParamsVenue,
  },
  cm2ey1yd60000zjkvgpkyyxyp: {
    getComplexApartments: getApartmentsStrata,
    getComplexParams: getParamsStrata,
  },
  cm2eyskbl0007zjkvhecx7mj0: {
    getComplexApartments: getApartmentsAzure,
    getComplexParams: getParamsAzure,
  },
  cm2eypxcz0006zjkv4pmclgvk: {
    getComplexApartments: getApartmentsVerde,
    getComplexParams: getParamsVerde,
  },
  cm2ey5oip0001zjkvyulfu5ik: {
    getComplexApartments: getApartmentsCanyon,
    getComplexParams: getParamsCanyon,
  },
  cm2eyindg0004zjkvbz4uyqkn: {
    getComplexApartments: getApartmentsEdgewater,
    getComplexParams: getParamsEdgewater,
  },
  cm2eylagw0005zjkvjny5mwui: {
    getComplexApartments: getApartmentsChannel,
    getComplexParams: getParamsChannel,
  },
};

export async function getApartments(complexId, availabilityLink) {
  const apartmentsData = await getScrapedData(complexId, availabilityLink);
  var apartments = null;

  if (apartmentsData) {
    const selectedFunction =
      complexScrapeSpecifications[complexId]?.["getComplexApartments"];
    if (selectedFunction) {
      apartments = selectedFunction(apartmentsData);
    }
  }
  return apartments;
}

export async function getScrapedData(complexId, availabilityLink) {
  var complexParams = null;
  var apartmentsData = null;

  if (complexId && availabilityLink) {
    complexParams =
      complexScrapeSpecifications[complexId]?.["getComplexParams"]?.() ||
      complexParams;

    if (complexParams) {
      var response = null;
      try {
        response = await fetchDataWithRetry(
          complexId,
          availabilityLink,
          complexParams
        );
      } catch {
        console.log("A problem occurs when scraping. Complex id: " + complexId);
      }

      var decoder = new TextDecoder();
      if (response && response.data) {
        try {
          JSON.parse(response.data);
          apartmentsData = JSON.parse(decoder.decode(response.data));
        } catch (error) {
          console.log(`Invalid JSON as scraped data: ${error}`);
        }
      }
    }
  }
  return apartmentsData;
}

async function getData(url, params) {
  const apiKey = process.env.SCRAPING_BEE_API_KEY;
  var client = new scrapingbee.ScrapingBeeClient(apiKey);

  try {
    return await client.get({
      url: url,
      params: params,
    });
  } catch (error) {
    console.log(`Error in scraping: ${error}`);
  }
}

async function getComplexes() {
  const complexes = await prisma.complex.findMany(
    {
      where: {
        //location: "Dogpatch",
        //location: "Mission Bay",
        show: Boolean(true),
      },
      select: {
        id: true,
        title: true,
        availabilityLink: true,
        apartments: true,
      },
    },
    prisma
  );
  return complexes ?? null;
}

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

async function deleteApartmentsFromDB(complexId) {
  const existingApartments = await prisma.apartment.deleteMany({
    where: {
      complexId: complexId,
    },
  });
  return;
}

async function fetchDataWithRetry(id, url, params, retries = 3, backoff = 300) {
  try {
    return await getData(url, params);
  } catch (error) {
    if (retries === 0) throw error;
    console.log(`Retrying getting Data from ${id}... ${retries} attempts left`);
    await new Promise((resolve) => setTimeout(resolve, backoff));
    return fetchDataWithRetry(id, url, params, retries - 1, backoff * 2);
  }
}
