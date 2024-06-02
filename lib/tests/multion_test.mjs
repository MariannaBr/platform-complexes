import { MultiOnClient } from "multion";
import dotenv from "dotenv";
import { json } from "stream/consumers";

dotenv.config();

const multion = new MultiOnClient({
  apiKey: process.env.MULTION_API_KEY,
});

// const browse = await multion.browse({
//   cmd: "hello",
//   url: "https://www.google.com",
// });
// console.log("browse:", browse);

// export async function scrape(link) {
//   await multion.sessions.create({
//     url: link,
//   });
// }

const create = await multion.sessions.create({
  url: "https://www.avaloncommunities.com/california/san-francisco-apartments/avalon-dogpatch/#community-unit-listings",
});

const close = await multion.sessions.close(create.sessionId);

console.log(close);

const step = await multion.sessions.retrieve({
  cmd: "You are an expert in analyzing data from website. Visit https://www.avaloncommunities.com/california/san-francisco-apartments/avalon-dogpatch/#community-unit-listings. Your task is to find all apartments listed on the page. Create a json with the unit's title, number of bedrooms, number of bathrooms, square feet, price, link of unit's picture and link for applying for the unit if it's given. The keys are named as: title, bedrooms, bathrooms, area, price, image_link, apartment_link",
  url: "https://www.avaloncommunities.com/california/san-francisco-apartments/avalon-dogpatch/#community-unit-listings",
  format: "json",
});

console.log(step);
