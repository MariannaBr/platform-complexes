import prisma from "../lib/prisma";
import puppeteer from "puppeteer";
const scrapingbee = require("scrapingbee");
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
} from "./scrapingParams";
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
  const complexes = await getComplexes();

  for (const complex of complexes) {
    await deleteApartmentsFromDB(complex.id);
    console.log(complex.title);
    const apartments = await getApartments(
      complex.id,
      complex.availabilityLink
    );
    apartments.forEach((apartment) => {
      saveApartmentToDB(complex, apartment);
    }, apartments);
  }
}

export async function getApartments(complexId, availabilityLink) {
  const apartmentsData = await getScrapedData(complexId, availabilityLink);
  var apartments = [];
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
  console.log(apartments.length);
  return apartments;
}

export async function getScrapedData(complexId, availabilityLink) {
  const apiKey = process.env.SCRAPING_BEE_API_KEY;
  var client = new scrapingbee.ScrapingBeeClient(apiKey);
  var complexParams = null;
  var apartmentsData = null;

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
    try {
      var response = await client.get({
        url: availabilityLink,
        params: complexParams,
      });
    } catch {
      console.log("A problem occurs when scraping. Complex id: " + complexId);
    }

    var decoder = new TextDecoder();
    if (response && response.data) {
      try {
        JSON.parse(response.data);
        apartmentsData = JSON.parse(decoder.decode(response.data));
      } catch {
        console.log("Invalid JSON as scraped data.");
      }
    }
  }
  return apartmentsData;
}

export async function getComplexes() {
  const complexes = await prisma.complex.findMany(
    {
      where: {
        location: String("Dogpatch"),
        show: Boolean(true),
      },
      select: {
        id: true,
        title: true,
        availabilityLink: true,
      },
    },
    prisma
  );
  return complexes;
}

async function saveApartmentToDB(complex, apartment) {
  const apartmentData = await prisma.apartment.create(
    {
      data: {
        complexId: complex.id,
        beds: apartment.bedrooms,
        baths: apartment.baths,
        area: apartment.area,
        price: apartment.price,
        image: apartment.picture,
        link: apartment.apartment_link,
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

async function fetchDataWithRetry(url, retries = 3, backoff = 300) {
  try {
    return await get(url); // Your existing function
  } catch (error) {
    if (retries === 0) throw error;
    console.log(`Retrying... ${retries} attempts left`);
    await new Promise((r) => setTimeout(r, backoff));
    return fetchDataWithRetry(url, retries - 1, backoff * 2);
  }
}