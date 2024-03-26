import puppeteer from "puppeteer-extra";
import prisma from "../lib/prisma";
//const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

export async function saveApartments() {
  const complexes = await getComplexes();

  for (const complex of complexes) {
    await deleteApartmentsFromDB(complex.id);
    let apartments = [];
    if (complex.id === "cltohgdfs0000ojznsx59m20f") {
      apartments = await getApartmentsChase(complex.availabilityLink);
    } else if (complex.id === "clso0gn4b000111l2vkugd9hr") {
      apartments = await getApartmentsAvalon(complex.availabilityLink);
    } else if (complex.id === "clsw3fsrp00001ht01srb6fn0") {
      apartments = await getApartmentsPotrero(complex.availabilityLink);
    } else if (complex.id === "clso0h2jb000211l2zth2tp7q") {
      apartments = await getApartmentsMartin(complex.availabilityLink);
    } else if (complex.id === "clsw3h95f00011ht0ws6re5m9") {
      apartments = await getApartmentsMariposa(complex.availabilityLink);
    } else if (complex.id === "clsw3ipju00021ht0vjhh2ymf") {
      apartments = await getApartmentsGantry(complex.availabilityLink);
    } else if (complex.id === "clsw3ltv200031ht0qfaojbyk") {
      apartments = await getApartmentsOAM(complex.availabilityLink);
    }
    apartments.forEach((apartment) => {
      saveApartmentToDB(complex, apartment);
    }, apartments);
  }
}
// DONT WORK:
// MARTIN
// TENN
// WINDSOR
// POTRERO
// GANTRY

// same/similar structure for Martin, Tenn apartments
export async function getApartmentsTenn() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(await browser.version());
  await page.goto("https://www.live777tenn.com/floorplans", {
    waitUntil: "networkidle0",
  });
  const resultSelector = ".card";
  //console.log(await page.content());
  await page.waitForSelector(resultSelector, { visible: true });
  const data = await page.evaluate((resultSelector) => {
    const items = Array.from(document.querySelectorAll(resultSelector));
    return items.map((item) => {
      const bedrooms = item.textContent.trim();
      //   const baths = item.querySelector(".nu-bathroom").textContent.trim();
      //   const area = item.querySelector(".nu-area").textContent.trim();
      //   const picture = item.querySelector(".card-img-top").src;
      //   const price = item.querySelector(".fieldset .font-weight-bold").innerText;
      //   const apartment_slug = item.querySelector(
      //     ".floorplan-action-button"
      //   ).href;
      //   const apartment_link = "https://www.live777tenn.com/floorplans"
      //     .apartment_slug;
      return { bedrooms };
      //   return { bedrooms, baths, area, picture, apartment_link, price };
    });
  }, resultSelector);
  console.log(data);
  return data;

  await browser.close();
}

export async function getApartmentsPotrero(availabilityLink) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(await browser.version());
  await page.goto(availabilityLink, {
    waitUntil: "networkidle0",
  });
  const resultSelector = ".table .floorplan-table-haven";
  await page.click('button[data-toggle="collapse"][data-target="#collapse0"]'); // getting the studios, needs to be done for 1b and 2b
  //await page.waitForSelector(resultSelector, { visible: true });
  const data = await page.evaluate((resultSelector) => {
    const items = Array.from(document.querySelectorAll(resultSelector));

    return items.map((item) => {
      const bedrooms = item.querySelector("td:nth-child(2)").textContent.trim();
      const baths = item.querySelector("td:nth-child(3)").textContent.trim();
      const area =
        item.querySelector("td:nth-child(4)").textContent.trim() + "sqft";
      const price = item.querySelector("td:nth-child(5)").textContent.trim();
      const apartment_link = item.querySelector("td:nth-child(6) > a").href;
      return { bedrooms, baths, area, apartment_link, price };
    });
  }, resultSelector);

  console.log(data);
  await browser.close();
  return data;
}

export async function getApartmentsMartin(availabilityLink) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(await browser.version());
  await page.goto(availabilityLink, {
    waitUntil: "networkidle0",
  });
  const resultSelector = ".card";
  //console.log(await page.content());
  //await page.waitForSelector(resultSelector, { visible: true });
  const data = await page.evaluate((resultSelector) => {
    const items = Array.from(document.querySelectorAll(resultSelector));
    return items.map((item) => {
      const bedrooms = item.querySelector(".nu-bed + span").textContent.trim();
      const baths = item
        .querySelector(".nu-bathroom + span")
        .textContent.trim();
      const area = item.querySelector(".nu-area + span").textContent.trim();
      const picture = item.querySelector(".card-img-top").src;
      const price = item.querySelector(".fieldset .font-weight-bold").innerText;
      const apartment_slug = item.querySelector(
        ".floorplan-action-button"
      ).href;
      const apartment_link = availabilityLink + apartment_slug;
      return { bedrooms, baths, area, picture, apartment_link, price };
    });
  }, resultSelector);
  console.log(data);
  await browser.close();
  return data;
}

export async function getApartmentsGantry(availabilityLink) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(await browser.version());
  await page.goto(availabilityLink, {
    waitUntil: "networkidle0",
  });
  const resultSelector = ".fp-group-item";
  //await page.waitForSelector(resultSelector, { visible: true });
  const data = await page.evaluate((resultSelector) => {
    const items = Array.from(document.querySelectorAll(resultSelector));

    return items.map((item) => {
      const bedbath = item
        .querySelector(".fp-col .bed-bath > span .fp-col-text")
        .textContent.trim(); // needs to be checked
      // const bedrooms = bedbath.split("|")[0].trim();
      // const baths = bedbath.split("|")[1].trim();
      // const area = item.querySelector(".sqft").textContent.trim();
      // const picture = item.querySelector(".image-popup").href;
      // const apartment_link = item.querySelector("a[title='Apply Now']").href;
      // const priceFull = item.querySelector(".price").textContent.trim();
      // const index = priceFull.indexOf("$");
      // const price = priceFull.substring(index);
      return { bedrooms, baths, area, picture, apartment_link, price };
    });
  }, resultSelector);

  console.log(data);
  await browser.close();
  return data;
}

export async function getApartmentsOAM(availabilityLink) {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  console.log(await browser.version());
  await page.goto(availabilityLink, {
    waitUntil: "networkidle2",
  });
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  const resultSelector = ".v-card .v-sheet .floorplan";
  await page.waitForSelector(resultSelector, { timeout: 5000 });
  await page.click("button[class=card-nav-btn]");
  const data = await page.evaluate((resultSelector) => {
    const items = Array.from(document.querySelectorAll(resultSelector));

    return items.map((item) => {
      const info = item
        .querySelector(".floorplan-title-meta > span")
        .textContent.trim();
      const infoArray = info.split("•");
      const bedrooms = infoArray[0].trim();
      const baths = infoArray[1].trim();
      const area = infoArray[2].trim();
      const picture = item.querySelector(".unit-img").src;
      const apartment_link = item.querySelector(
        ".unit-item-details > div > a"
      ).href;
      const price = item.querySelector(".unit-price").textContent.trim();
      return button;
      return { bedrooms, baths, area, picture, apartment_link, price };
    });
  }, resultSelector);

  console.log(data);
  await browser.close();
  //return data;
}

// WORK
export async function getApartmentsMariposa(availabilityLink) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(await browser.version());
  await page.goto(availabilityLink, {
    waitUntil: "networkidle0",
  });
  const resultSelector = ".module-floorplans";
  await page.waitForSelector(resultSelector, { visible: true });
  const data = await page.evaluate((resultSelector) => {
    const items = Array.from(document.querySelectorAll(resultSelector));

    return items.map((item) => {
      const bedbath = item.querySelector(".bedbath").textContent.trim();
      const bedrooms = bedbath.split("|")[0].trim();
      const baths = bedbath.split("|")[1].trim();
      const area = item.querySelector(".sqft").textContent.trim();
      const picture = item.querySelector(".image-popup").href;
      const apartment_link = item.querySelector("a[title='Apply Now']").href;
      const priceFull = item.querySelector(".price").textContent.trim();
      const index = priceFull.indexOf("$");
      const price = priceFull.substring(index);
      return { bedrooms, baths, area, picture, apartment_link, price };
    });
  }, resultSelector);

  await browser.close();
  return data;
}

export async function getApartmentsChase(availabilityLink) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(await browser.version());
  await page.goto(availabilityLink, {
    waitUntil: "networkidle0",
  });
  const resultSelector = ".listing-item";
  await page.waitForSelector(resultSelector, { visible: true });
  const data = await page.evaluate((resultSelector) => {
    const items = Array.from(document.querySelectorAll(resultSelector));

    return items.map((item) => {
      const bedrooms = item.querySelector(".beds").textContent.trim();
      const baths = item.querySelector(".baths").textContent.trim();
      const areaFull = item.querySelector(".sqft").textContent.trim();
      const area = areaFull.slice(0, -1);
      const picture = item
        .querySelector(".slider-image")
        .style.backgroundImage.split('"')[1];
      const apartment_link = item.querySelector(".slider-link").href;
      const priceFull = item.querySelector(".rent").textContent.trim();
      const index = priceFull.indexOf("$");
      const price = priceFull.substring(index);
      return { bedrooms, baths, area, picture, apartment_link, price };
    });
  }, resultSelector);

  console.log(data.length);
  await browser.close();
  return data;
}

export async function getApartmentsAvalon(availabilityLink) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(await browser.version());
  await page.goto(availabilityLink, {
    waitUntil: "networkidle0",
  });
  const resultSelector = ".ant-card-body";
  const data = await page.evaluate((resultSelector) => {
    document.querySelector("[id^=load-all-units]").click();
    const items = Array.from(document.querySelectorAll(resultSelector));

    return items.map((item) => {
      const info = item.querySelector(".description").textContent.trim();
      const infoArray = info.split("•");
      const bedrooms = infoArray[0].trim();
      const baths = infoArray[1].trim();
      const area = infoArray[2].trim();
      const picture = item.querySelector(".unit-img").src;
      const apartment_link = item.querySelector(
        ".unit-item-details > div > a"
      ).href;
      const price = item.querySelector(".unit-price").textContent.trim();
      return { bedrooms, baths, area, picture, apartment_link, price };
    });
  }, resultSelector);

  console.log(data.length);
  await browser.close();
  return data;
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
