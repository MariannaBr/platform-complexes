import puppeteer from "puppeteer";
import prisma from "../lib/prisma";

export async function saveApartments() {
  const complexes = await getComplexes();

  for (const complex of complexes) {
    await deleteApartmentsFromDB(complex.id);
    let apartments = [];
    if (complex.id === "cltohgdfs0000ojznsx59m20f") {
      apartments = await getApartmentsChase(complex.availabilityLink);
    } else if (complex.id === "clso0gn4b000111l2vkugd9hr") {
      apartments = await getApartmentsAvalon(complex.availabilityLink);
    }
    apartments.forEach((apartment) => {
      saveApartmentToDB(complex, apartment);
    }, apartments);
  }
}

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

  await browser.close();
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
