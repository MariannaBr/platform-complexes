// // when some apartments on webpage - change to ScrapingBee
// export async function getApartmentsChase(availabilityLink) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(availabilityLink, {
//     waitUntil: "networkidle0",
//     timeout: 0,
//   });
//   const resultSelector = ".listing-item";
//   const data = await page.evaluate((resultSelector) => {
//     const items = Array.from(document.querySelectorAll(resultSelector));

//     return items.map((item) => {
//       const bedrooms = item.querySelector(".beds").textContent.trim();
//       const baths = item.querySelector(".baths").textContent.trim();
//       const areaFull = item.querySelector(".sqft").textContent.trim();
//       const area = areaFull.slice(0, -1);
//       const picture = item
//         .querySelector(".slider-image")
//         .style.backgroundImage.split('"')[1];
//       const apartment_link = item.querySelector(".slider-link").href;
//       const priceFull = item.querySelector(".rent").textContent.trim();
//       const index = priceFull.indexOf("$");
//       const price = priceFull.substring(index);
//       return { bedrooms, baths, area, picture, apartment_link, price };
//     });
//   }, resultSelector);

//   console.log(data.length);
//   await browser.close();
//   return data;
// }

// // using ScrapingBee
// export async function getApartmentsAvalon(availabilityLink) {
//   const apiKey = process.env.SCRAPING_BEE_API_KEY;
//   var client = new scrapingbee.ScrapingBeeClient(apiKey);
//   var response = await client.get({
//     url: availabilityLink,
//     params: {
//       js_scenario: {
//         instructions: [
//           { wait_for_and_click: "[id^=load-all-units]" },
//           { wait: 5000 },
//         ],
//       },
//       wait: "35000",
//       block_resources: "False",
//       wait_for: ".ant-card-body",
//       extract_rules: {
//         apartments: {
//           selector: ".ant-card-body",
//           type: "list",
//           output: {
//             info: {
//               selector: ".description",
//             },
//             price: {
//               selector: ".unit-price",
//             },
//             picture: {
//               selector: ".unit-img",
//               output: "@src",
//             },
//             link: {
//               selector: ".unit-item-details-title",
//               output: "@href",
//             },
//           },
//         },
//       },
//     },
//   });
//   var decoder = new TextDecoder();
//   var apartmentsData = JSON.parse(decoder.decode(response.data));
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
//   return apartments;
// }

// // using ScrapingBee
// export async function getApartmentsMariposa(availabilityLink) {
//   const apiKey = process.env.SCRAPING_BEE_API_KEY;
//   var client = new scrapingbee.ScrapingBeeClient(apiKey);
//   var response = await client.get({
//     url: availabilityLink,
//     params: {
//       block_resources: "False",
//       wait_for: ".floorplans-content",
//       extract_rules: {
//         apartments: {
//           selector: ".floorplans-content",
//           type: "list",
//           output: {
//             info: {
//               selector: ".bedbath",
//             },
//             area: {
//               selector: ".sqft",
//             },
//             price: {
//               selector: ".price",
//             },
//             picture: {
//               selector: ".image-popup",
//               output: "@href",
//             },
//             link: {
//               selector: "a[title='Apply Now']",
//               output: "@href",
//             },
//           },
//         },
//       },
//     },
//   });
//   var decoder = new TextDecoder();
//   var apartmentsData = JSON.parse(decoder.decode(response.data));
//   var apartments = apartmentsData.apartments.map((item) => {
//     const bedBath = item.info;
//     var bedrooms = bedBath.split("|")[0].trim();
//     if (bedrooms.includes("0")) {
//       bedrooms = "Studio";
//     }
//     const baths = bedBath.split("|")[1].trim();
//     var area = item.area + " Sq. Ft.";
//     if (!item.area) {
//       area = "- Sq. Ft.";
//     }
//     var price = null;
//     if (item.price.includes("$")) {
//       const index = item.price.indexOf("$");
//       price = item.price.substring(index);
//     }
//     const image = "https://www.themariposa.com" + item.picture;
//     const apartment_link = item.link;
//     return { bedrooms, baths, area, price, image, apartment_link };
//   });
//   console.log(apartments.length);
//   return apartments;
// }

// // using ScrapingBee because of captcha
// export async function getApartmentsTenn(availabilityLink) {
//   const apiKey = process.env.SCRAPING_BEE_API_KEY;
//   var client = new scrapingbee.ScrapingBeeClient(apiKey);
//   var response = await client.get({
//     url: availabilityLink,
//     params: {
//       wait_for: ".fp-container",
//       extract_rules: {
//         apartments: {
//           selector: '//div[@id="floorplans-container"]/div',
//           type: "list",
//           output: {
//             info: {
//               selector: "li",
//               type: "list",
//               output: "text",
//             },
//             price: {
//               selector: ".card-body span",
//               type: "item",
//             },
//             picture: {
//               selector: ".card-img-top",
//               output: "@src",
//             },
//             link: {
//               selector: ".floorplan-action-button",
//               output: "@href",
//             },
//           },
//         },
//       },
//     },
//   });
//   var decoder = new TextDecoder();
//   var apartmentsData = JSON.parse(decoder.decode(response.data)); // list of all apartments with info, picture link and link for applying
//   var apartments = apartmentsData.apartments
//     .filter((item) => {
//       if (item.info.length === 3) {
//         return item;
//       }
//     })
//     .map((item) => {
//       const bedrooms = item.info[0];
//       const baths = item.info[1];
//       const area = item.info[2];
//       var price = null;
//       if (item.price.includes("$")) {
//         const index = item.price.indexOf("$");
//         price = item.price.slice(index);
//       }
//       const picture = item.picture;
//       var apartment_link = "https://www.live777tenn.com" + item.link;
//       return { bedrooms, baths, area, price, picture, apartment_link };
//     });
//   console.log(apartments.length);
//   return apartments;
// }

// // using ScrapingBee because of captcha
// export async function getApartmentsMartin(availabilityLink) {
//   const apiKey = process.env.SCRAPING_BEE_API_KEY;
//   var client = new scrapingbee.ScrapingBeeClient(apiKey);
//   var response = await client.get({
//     url: availabilityLink,
//     params: {
//       wait_for: ".fp-container",
//       extract_rules: {
//         apartments: {
//           selector: '//div[@id="floorplans-container"]/div',
//           type: "list",
//           output: {
//             info: {
//               selector: "li",
//               type: "list",
//               output: "text",
//             },
//             price: {
//               selector: ".card-body span",
//               type: "item",
//             },
//             picture: {
//               selector: ".card-img-top",
//               output: "@src",
//             },
//             link: {
//               selector: ".floorplan-action-button",
//               output: "@href",
//             },
//           },
//         },
//       },
//     },
//   });
//   var decoder = new TextDecoder();
//   var apartmentsData = JSON.parse(decoder.decode(response.data)); // list of all apartments with info, picture link and link for applying
//   var apartments = apartmentsData.apartments
//     .filter((item) => {
//       if (item.info.length === 3) {
//         return item;
//       }
//     })
//     .map((item) => {
//       const bedrooms = item.info[0];
//       const baths = item.info[1];
//       const area = item.info[2];
//       var price = null;
//       if (item.price.includes("$")) {
//         const index = item.price.indexOf("$");
//         price = item.price.slice(index);
//       }
//       const picture = item.picture;
//       var apartment_link = "https://www.themartinsf.com/" + item.link;
//       return { bedrooms, baths, area, price, picture, apartment_link };
//     });
//   console.log(apartments.length);
//   return apartments;
// }

// // using ScrapingBee because of captcha
// export async function getApartmentsWindsor(availabilityLink) {
//   const apiKey = process.env.SCRAPING_BEE_API_KEY;
//   var client = new scrapingbee.ScrapingBeeClient(apiKey);
//   var response = await client.get({
//     url: availabilityLink,
//     params: {
//       wait_for: ".fp-container",
//       extract_rules: {
//         apartments: {
//           selector: '//div[@id="floorplans-container"]/div',
//           type: "list",
//           output: {
//             title: {
//               selector: "h2",
//               type: "item",
//             },
//             info: {
//               selector: "li",
//               type: "list",
//               output: "text",
//             },
//             price: {
//               selector: ".card-body span",
//               type: "item",
//             },
//             picture: {
//               selector: ".card-img-top",
//               output: "@src",
//             },
//             link: {
//               selector: ".floorplan-action-button",
//               output: "@href",
//             },
//           },
//         },
//       },
//     },
//   });
//   var decoder = new TextDecoder();
//   var apartmentsData = JSON.parse(decoder.decode(response.data)); // list of all apartments with info, picture link and link for applying
//   var apartments = apartmentsData.apartments
//     .filter((item) => {
//       if (item.info.length === 3) {
//         return item;
//       }
//     })
//     .map((item) => {
//       const titel = item.title.toLowerCase();
//       const bedrooms = item.info[0];
//       const baths = item.info[1];
//       const area = item.info[2];
//       var price = null;
//       if (item.price.includes("$")) {
//         const index = item.price.indexOf("$");
//         price = item.price.slice(index);
//       }
//       const picture = item.picture;
//       var apartment_link =
//         "https://www.windsoratdogpatch.com/floorplans/" + titel;
//       return { bedrooms, baths, area, price, picture, apartment_link };
//     });
//   console.log(apartments.length);
//   return apartments;
// }

// // using ScrapingBee because of captcha
// export async function getApartmentsOAM(availabilityLink) {
//   const apiKey = process.env.SCRAPING_BEE_API_KEY;
//   var client = new scrapingbee.ScrapingBeeClient(apiKey);
//   var response = await client.get({
//     url: availabilityLink,
//     params: {
//       js_scenario: {
//         instructions: [
//           { wait_for_and_click: ".card-nav-btn" },
//           { wait: 10000 },
//         ],
//       },
//       block_resources: "False",
//       wait: "35000",
//       wait_for: ".card-container",
//       extract_rules: {
//         apartments: {
//           selector: ".card-container",
//           type: "list",
//           output: {
//             info: {
//               selector: ".floorplan-title-meta span",
//               type: "list",
//               output: "text",
//             },
//             price: {
//               selector: ".rate-display span",
//               type: "item",
//             },
//             picture: {
//               selector: ".v-image__image",
//               output: "@style",
//             },
//             link: {
//               selector: ".card-cta a",
//               output: "@href",
//             },
//           },
//         },
//       },
//     },
//   });

//   var decoder = new TextDecoder();
//   if (!response) return [];
//   var apartmentsData = JSON.parse(decoder.decode(response.data)); // list of all apartments with info, picture link and link for applying
//   var apartments = apartmentsData.apartments.map((item) => {
//     const bedrooms = item.info[0];
//     const baths = item.info[1];
//     const area = item.info[2];
//     var price = null;
//     if (item.link.length === 0 && item.price.includes("$")) {
//       const index = item.price.indexOf("$");
//       price = item.price.slice(index);
//     }
//     var image = null;
//     const regex = /url\("([^"]+)"\)/;
//     const match = item.picture.match(regex);
//     if (match && match[1]) {
//       image = match[1];
//     }
//     var apartment_link =
//       "https://www.oandmsf.com/apartments/ca/san-francisco/floor-plans";
//     return { bedrooms, baths, area, price, image, apartment_link };
//   });
//   console.log(apartments);
//   return apartments;
// }

// // using ScrapingBee because of captcha
// export async function getApartmentsGantry(availabilityLink) {
//   const apiKey = process.env.SCRAPING_BEE_API_KEY;
//   var client = new scrapingbee.ScrapingBeeClient(apiKey);
//   var response = await client.get({
//     url: availabilityLink,
//     params: {
//       block_resources: "False",
//       wait_for: ".fp-group-list",
//       extract_rules: {
//         apartments: {
//           selector: ".fp-group-list > li",
//           type: "list",
//           output: {
//             info: {
//               selector: ".bed-bath > span",
//               type: "list",
//               output: "text",
//             },
//             price: {
//               selector: ".rent > div",
//               type: "item",
//               output: "text",
//             },
//             area: {
//               selector: ".sq-feet > span",
//               type: "list",
//               output: "text",
//             },
//             picture: {
//               selector: ".image-link img",
//               output: "@src",
//             },
//             link: {
//               selector: ".secondary-action",
//               output: "@href",
//             },
//           },
//         },
//       },
//     },
//   });
//   var decoder = new TextDecoder();
//   var apartmentsData = JSON.parse(decoder.decode(response.data)); // list of all apartments with info, picture link and link for applying
//   var apartments = apartmentsData.apartments.map((item) => {
//     const bedBath = item.info[1].split("/");
//     const beds = bedBath[0].trim().split(" ")[0];
//     const bath = bedBath[1].trim().split(" ")[0];
//     var bedrooms = beds + " Beds";
//     if (beds === "1") {
//       bedrooms = beds + " Bed";
//     }
//     var baths = bath + " Baths";
//     if (bath === "1") {
//       baths = bath + " Bath";
//     }
//     const area = item.area[1] + " " + item.area[0];
//     var price = null;
//     if (item.price.includes("$")) {
//       const index = item.price.indexOf("$");
//       const priceMonth = item.price.slice(index);
//       price = priceMonth.split("/")[0];
//     }
//     var image = item.picture;
//     var apartment_link = item.link;
//     return { bedrooms, baths, area, price, image, apartment_link };
//   });
//   console.log(apartments.length);
//   return apartments;
// }

// // using ScrapingBee
// export async function getApartmentsPotrero(availabilityLink) {
//   const apiKey = process.env.SCRAPING_BEE_API_KEY;
//   var client = new scrapingbee.ScrapingBeeClient(apiKey);
//   var response = await client.get({
//     url: availabilityLink,
//     params: {
//       block_resources: "False",
//       wait: "35000",
//       wait_for: ".card",
//       extract_rules: {
//         apartments: {
//           selector: '//input[@name="json_response"]',
//           output: "@value",
//         },
//       },
//     },
//   });

//   var decoder = new TextDecoder();
//   const dataDecoded = JSON.parse(decoder.decode(response.data));
//   const apartmentsData = JSON.parse(dataDecoded.apartments);
//   var apartments = apartmentsData.map((item) => {
//     const beds = item.Beds;
//     var bedrooms = beds + " Beds";
//     if (beds === "0") {
//       bedrooms = "Studio";
//     }
//     if (beds === "1") {
//       bedrooms = beds + " Bed";
//     }

//     const bath = item.Baths;
//     const bathArray = Array.from(bath);
//     var bathCleaned = bathArray[0];
//     if (bathArray[2] !== "0") {
//       bathCleaned = bath.slice(0, 3);
//     }
//     var baths = bathCleaned + " Baths";
//     if (bathCleaned === "1") {
//       baths = bathCleaned + " Bath";
//     }

//     const area = item.MinimumSQFT + " Sq. Ft.";
//     var price = null;
//     const rentArray = Array.from(item.MinimumRent);
//     if (item.MinimumRent !== "-1") {
//       price = "$" + rentArray[0] + "," + item.MinimumRent.slice(1);
//     }
//     var image = item.FloorplanImageURL;
//     var apartment_link = item.AvailabilityURL;
//     return { bedrooms, baths, area, price, image, apartment_link };
//   });
//   console.log(apartments.length);
//   return apartments;
// }
