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
} from "./cleanedScrapedData.mjs";

export async function saveApartments() {
  var success = false;
  const complexes = await getComplexes("Dogpatch");
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
        }, apartments);
      }
      const oldApartmentCount = complex.apartments.length;
      const newApartmentCount = apartments?.length;
      console.log(`Old apartment count: ${oldApartmentCount}`);
      console.log(`New apartment count: ${newApartmentCount}`);
    }
  }
  return success;
}

export async function getApartments(complexId, availabilityLink) {
  const apartmentsData = await getScrapedData(complexId, availabilityLink);
  var apartments = null;

  if (apartmentsData) {
    switch (complexId) {
      case "cltohgdfs0000ojznsx59m20f":
        apartments = getApartmentsChase(apartmentsData);
        break;
      case "clso0gn4b000111l2vkugd9hr":
        apartments = getApartmentsAvalon(apartmentsData);
        break;
      case "clsw3h95f00011ht0ws6re5m9":
        apartments = getApartmentsMariposa(apartmentsData);
        break;
      case "clsw3n29300041ht0xkt6xnck":
        apartments = getApartmentsTenn(apartmentsData);
        break;
      case "clsw3fsrp00001ht01srb6fn0":
        apartments = getApartmentsPotrero(apartmentsData);
        break;
      case "clso0h2jb000211l2zth2tp7q":
        apartments = getApartmentsMartin(apartmentsData);
        break;
      case "clsw3ipju00021ht0vjhh2ymf":
        apartments = getApartmentsGantry(apartmentsData);
        break;
      case "clsw3ltv200031ht0qfaojbyk":
        apartments = getApartmentsOAM(apartmentsData);
        break;
      case "clsoxku0p000311l2lepcpi8w":
        apartments = getApartmentsWindsor(apartmentsData);
        break;
    }
  }
  return apartments;
}

export async function getScrapedData(complexId, availabilityLink) {
  var complexParams = null;
  var apartmentsData = null;

  if (complexId && availabilityLink) {
    switch (complexId) {
      case "cltohgdfs0000ojznsx59m20f":
        complexParams = getParamsChase();
        break;
      case "clso0gn4b000111l2vkugd9hr":
        complexParams = getParamsAvalon();
        break;
      case "clsw3h95f00011ht0ws6re5m9":
        complexParams = getParamsMariposa();
        break;
      case "clsw3n29300041ht0xkt6xnck":
        complexParams = getParamsTenn();
        break;
      case "clsw3fsrp00001ht01srb6fn0":
        complexParams = getParamsPotrero();
        break;
      case "clso0h2jb000211l2zth2tp7q":
        complexParams = getParamsMartin();
        break;
      case "clsw3ipju00021ht0vjhh2ymf":
        complexParams = getParamsGantry();
        break;
      case "clsw3ltv200031ht0qfaojbyk":
        complexParams = getParamsOAM();
        break;
      case "clsoxku0p000311l2lepcpi8w":
        complexParams = getParamsWindsor();
        break;
    }

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

async function getComplexes(district) {
  const complexes = await prisma.complex.findMany(
    {
      where: {
        location: String(district),
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
